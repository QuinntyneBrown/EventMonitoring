// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Provides serialization and deserialization for messages with support for header inspection.
/// </summary>
public interface IMessageSerializer
{
    /// <summary>
    /// Serializes a message envelope to bytes.
    /// </summary>
    /// <typeparam name="T">The type of the message payload.</typeparam>
    /// <param name="envelope">The message envelope to serialize.</param>
    /// <returns>The serialized message bytes.</returns>
    byte[] Serialize<T>(MessageEnvelope<T> envelope) where T : IMessage;

    /// <summary>
    /// Deserializes a message envelope from bytes.
    /// </summary>
    /// <typeparam name="T">The type of the message payload.</typeparam>
    /// <param name="data">The serialized message bytes.</param>
    /// <returns>The deserialized message envelope.</returns>
    MessageEnvelope<T> Deserialize<T>(ReadOnlyMemory<byte> data) where T : IMessage;

    /// <summary>
    /// Peeks at the message header without fully deserializing the payload.
    /// This is more efficient for routing decisions.
    /// </summary>
    /// <param name="data">The serialized message bytes.</param>
    /// <returns>A tuple containing the header and the resolved payload type, or null if deserialization fails.</returns>
    (MessageHeader Header, Type? PayloadType)? PeekHeader(ReadOnlyMemory<byte> data);
}
