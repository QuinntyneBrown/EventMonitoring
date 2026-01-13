// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using System.Diagnostics;

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Context information available to message handlers during processing.
/// </summary>
public sealed class MessageContext
{
    /// <summary>
    /// Gets or initializes the message header.
    /// </summary>
    public required MessageHeader Header { get; init; }

    /// <summary>
    /// Gets or initializes the channel the message was received on.
    /// </summary>
    public required string Channel { get; init; }

    /// <summary>
    /// Gets or initializes the timestamp when the message was received.
    /// </summary>
    public required DateTimeOffset ReceivedAt { get; init; }

    /// <summary>
    /// Gets or initializes the retry count for this message.
    /// </summary>
    public int RetryCount { get; init; }

    /// <summary>
    /// Gets or initializes the scoped service provider for resolving dependencies.
    /// </summary>
    public required IServiceProvider Services { get; init; }

    /// <summary>
    /// Gets or initializes the distributed tracing activity.
    /// </summary>
    public Activity? Activity { get; init; }
}
