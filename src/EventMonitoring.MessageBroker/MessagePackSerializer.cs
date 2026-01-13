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
            // Deserialize the full envelope to access the header
            // MessagePack doesn't easily support partial deserialization without knowing the type
            // For a more efficient implementation, we would need to use MessagePackReader to manually parse
            // For now, we deserialize enough to get the header from the envelope structure
            var reader = new MessagePackReader(data);
            
            // Read the envelope array (should have 2 elements: header and payload)
            if (reader.TryReadArrayHeader(out var arrayLength) && arrayLength == 2)
            {
                // Read the header (first element)
                var headerData = reader.ReadRaw();
                var header = MessagePack.MessagePackSerializer.Deserialize<MessageHeader>(headerData, _options);
                
                // Resolve the payload type from the registry
                var payloadType = _typeRegistry.GetType(header.MessageType);
                
                return (header, payloadType);
            }
            
            return null;
        }
        catch
        {
            return null;
        }
    }
}
