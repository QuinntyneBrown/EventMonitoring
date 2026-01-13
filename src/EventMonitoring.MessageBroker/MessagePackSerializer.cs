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
            // For simplicity and correctness, we deserialize just the header part
            // MessagePack doesn't easily support efficient partial deserialization
            // We read the array header, then deserialize just the first element (the header)
            var reader = new MessagePackReader(data);
            
            // Read array header - envelope should have 2 elements [header, payload]
            var arrayLength = reader.ReadArrayHeader();
            if (arrayLength != 2)
                return null;
            
            // Now reader is positioned at the header element
            // Get the remaining bytes from current position
            var sequence = reader.Sequence.Slice(reader.Consumed);
            
            // Deserialize the header from the current position
            var header = MessagePack.MessagePackSerializer.Deserialize<MessageHeader>(sequence, _options);
            
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
