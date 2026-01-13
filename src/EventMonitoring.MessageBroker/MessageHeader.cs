// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using MessagePack;

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Standard message header containing routing, tracing, and idempotency metadata.
/// </summary>
[MessagePackObject]
public sealed class MessageHeader
{
    /// <summary>
    /// Gets or initializes the message type name for type discrimination.
    /// </summary>
    [Key(0)]
    public required string MessageType { get; init; }

    /// <summary>
    /// Gets or initializes the unique message identifier for idempotency (GUID format).
    /// </summary>
    [Key(1)]
    public required string MessageId { get; init; }

    /// <summary>
    /// Gets or initializes the correlation identifier for distributed tracing (GUID format).
    /// </summary>
    [Key(2)]
    public required string CorrelationId { get; init; }

    /// <summary>
    /// Gets or initializes the causation identifier for event chain tracking.
    /// This is the MessageId of the message that caused this message to be published.
    /// </summary>
    [Key(3)]
    public string? CausationId { get; init; }

    /// <summary>
    /// Gets or initializes the message creation timestamp in Unix milliseconds.
    /// </summary>
    [Key(4)]
    public required long TimestampUnixMs { get; init; }

    /// <summary>
    /// Gets or initializes the name of the service that published this message.
    /// </summary>
    [Key(5)]
    public required string SourceService { get; init; }

    /// <summary>
    /// Gets or initializes the schema version of the message payload.
    /// </summary>
    [Key(6)]
    public int SchemaVersion { get; init; }

    /// <summary>
    /// Gets or initializes optional metadata for extensibility.
    /// </summary>
    [Key(7)]
    public Dictionary<string, string>? Metadata { get; init; }
}
