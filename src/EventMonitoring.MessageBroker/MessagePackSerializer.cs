// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using MessagePack;
using MessagePack.Resolvers;

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Default implementation of <see cref="IMessageSerializer"/> using MessagePack with LZ4 compression.
/// </summary>
public sealed class MessagePackSerializer : IMessageSerializer
{
    private readonly IMessageTypeRegistry _typeRegistry;
    private readonly MessagePackSerializerOptions _options;

    public MessagePackSerializer(IMessageTypeRegistry typeRegistry)
    {
        _typeRegistry = typeRegistry ?? throw new ArgumentNullException(nameof(typeRegistry));
        
        // Configure MessagePack with LZ4 compression and security settings
        _options = MessagePackSerializerOptions.Standard
            .WithCompression(MessagePackCompression.Lz4BlockArray)
            .WithSecurity(MessagePackSecurity.UntrustedData)
            .WithResolver(ContractlessStandardResolver.Instance);
    }

    public byte[] Serialize<T>(MessageEnvelope<T> envelope) where T : IMessage
    {
        if (envelope == null)
            throw new ArgumentNullException(nameof(envelope));

        return MessagePack.MessagePackSerializer.Serialize(envelope, _options);
    }

    public MessageEnvelope<T> Deserialize<T>(ReadOnlyMemory<byte> data) where T : IMessage
    {
        return MessagePack.MessagePackSerializer.Deserialize<MessageEnvelope<T>>(data, _options);
    }

    public (MessageHeader Header, Type? PayloadType)? PeekHeader(ReadOnlyMemory<byte> data)
    {
        try
        {
            // For efficiency, we deserialize just enough to get the header
            // MessagePack stores data sequentially, so we can deserialize the envelope
            // and access the header without fully deserializing the payload
            var reader = new MessagePackReader(data);
            
            // Skip to the header (first element in the envelope array)
            reader.Skip(); // Skip array length marker if present
            
            // Deserialize just the header portion
            var header = MessagePack.MessagePackSerializer.Deserialize<MessageHeader>(data, _options);
            
            // Resolve the payload type from the registry
            var payloadType = _typeRegistry.GetType(header.MessageType);
            
            return (header, payloadType);
        }
        catch
        {
            return null;
        }
    }
}
