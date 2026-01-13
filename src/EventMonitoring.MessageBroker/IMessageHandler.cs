// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Non-generic base interface for message handlers to enable polymorphic invocation.
/// </summary>
public interface IMessageHandler
{
    /// <summary>
    /// Handles a message.
    /// </summary>
    /// <param name="message">The message to handle.</param>
    /// <param name="context">The message context.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    Task HandleAsync(object message, MessageContext context, CancellationToken cancellationToken);
}

/// <summary>
/// Generic interface for strongly-typed message handlers.
/// </summary>
/// <typeparam name="TMessage">The type of message this handler processes.</typeparam>
public interface IMessageHandler<in TMessage> : IMessageHandler
    where TMessage : IMessage
{
    /// <summary>
    /// Handles a message of type <typeparamref name="TMessage"/>.
    /// </summary>
    /// <param name="message">The message to handle.</param>
    /// <param name="context">The message context.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    Task HandleAsync(TMessage message, MessageContext context, CancellationToken cancellationToken);
}
