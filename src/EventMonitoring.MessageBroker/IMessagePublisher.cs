// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Service for publishing messages to Redis pub/sub.
/// </summary>
public interface IMessagePublisher
{
    /// <summary>
    /// Publishes a message to a specific channel.
    /// </summary>
    /// <typeparam name="T">The type of the message.</typeparam>
    /// <param name="channel">The channel to publish to.</param>
    /// <param name="message">The message to publish.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    Task PublishAsync<T>(string channel, T message, CancellationToken cancellationToken = default)
        where T : IMessage;
}
