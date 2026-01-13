// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.Extensions.Logging;

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Base class for message handlers providing common functionality.
/// </summary>
/// <typeparam name="TMessage">The type of message this handler processes.</typeparam>
public abstract class MessageHandlerBase<TMessage> : IMessageHandler<TMessage>
    where TMessage : IMessage
{
    /// <summary>
    /// Initializes a new instance of the <see cref="MessageHandlerBase{TMessage}"/> class.
    /// </summary>
    /// <param name="logger">The logger instance.</param>
    protected MessageHandlerBase(ILogger logger)
    {
        Logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    /// <summary>
    /// Gets the logger instance.
    /// </summary>
    protected ILogger Logger { get; }

    /// <summary>
    /// Handles a message of type <typeparamref name="TMessage"/>.
    /// </summary>
    /// <param name="message">The message to handle.</param>
    /// <param name="context">The message context.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>A task representing the asynchronous operation.</returns>
    public abstract Task HandleAsync(TMessage message, MessageContext context, CancellationToken cancellationToken);

    /// <summary>
    /// Non-generic handler implementation that delegates to the strongly-typed method.
    /// </summary>
    Task IMessageHandler.HandleAsync(object message, MessageContext context, CancellationToken cancellationToken)
    {
        return HandleAsync((TMessage)message, context, cancellationToken);
    }

    /// <summary>
    /// Logs that a message is being handled.
    /// </summary>
    /// <param name="message">The message being handled.</param>
    /// <param name="context">The message context.</param>
    protected void LogHandling(TMessage message, MessageContext context)
    {
        Logger.LogDebug(
            "Handling message {MessageType} with ID {MessageId}",
            context.Header.MessageType,
            context.Header.MessageId);
    }
}
