// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using MessagePack;

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Generic message envelope that separates transport concerns from business payload.
/// </summary>
/// <typeparam name="TPayload">The type of the business message payload.</typeparam>
[MessagePackObject]
public sealed class MessageEnvelope<TPayload>
    where TPayload : IMessage
{
    /// <summary>
    /// Gets or initializes the message header containing transport metadata.
    /// </summary>
    [Key(0)]
    public required MessageHeader Header { get; init; }

    /// <summary>
    /// Gets or initializes the business message payload.
    /// </summary>
    [Key(1)]
    public required TPayload Payload { get; init; }
}
