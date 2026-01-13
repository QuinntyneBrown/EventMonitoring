// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Provides access to the current message context using AsyncLocal storage.
/// </summary>
public interface IMessageContextAccessor
{
    /// <summary>
    /// Gets or sets the current message context.
    /// </summary>
    MessageContext? Current { get; set; }
}

/// <summary>
/// Default implementation of <see cref="IMessageContextAccessor"/> using AsyncLocal.
/// </summary>
public sealed class MessageContextAccessor : IMessageContextAccessor
{
    private static readonly AsyncLocal<MessageContext?> _current = new();

    /// <summary>
    /// Gets or sets the current message context.
    /// </summary>
    public MessageContext? Current
    {
        get => _current.Value;
        set => _current.Value = value;
    }
}
