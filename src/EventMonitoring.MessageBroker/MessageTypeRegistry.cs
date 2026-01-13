// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using System.Collections.Concurrent;

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Registry that maintains bidirectional mappings between message type names and CLR types.
/// </summary>
public interface IMessageTypeRegistry
{
    /// <summary>
    /// Registers a message type with its name.
    /// </summary>
    /// <typeparam name="T">The CLR type of the message.</typeparam>
    /// <param name="messageType">The message type name.</param>
    void Register<T>(string messageType) where T : IMessage;

    /// <summary>
    /// Gets the CLR type for a given message type name.
    /// </summary>
    /// <param name="messageType">The message type name.</param>
    /// <returns>The CLR type or null if not registered.</returns>
    Type? GetType(string messageType);

    /// <summary>
    /// Gets the message type name for a given CLR type.
    /// </summary>
    /// <typeparam name="T">The CLR type of the message.</typeparam>
    /// <returns>The message type name or null if not registered.</returns>
    string? GetMessageType<T>() where T : IMessage;

    /// <summary>
    /// Gets the message type name for a given CLR type.
    /// </summary>
    /// <param name="type">The CLR type of the message.</param>
    /// <returns>The message type name or null if not registered.</returns>
    string? GetMessageType(Type type);
}

/// <summary>
/// Default implementation of <see cref="IMessageTypeRegistry"/>.
/// </summary>
public sealed class MessageTypeRegistry : IMessageTypeRegistry
{
    private readonly ConcurrentDictionary<string, Type> _typeNameToClrType = new();
    private readonly ConcurrentDictionary<Type, string> _clrTypeToTypeName = new();

    public void Register<T>(string messageType) where T : IMessage
    {
        var type = typeof(T);
        _typeNameToClrType[messageType] = type;
        _clrTypeToTypeName[type] = messageType;
    }

    public Type? GetType(string messageType)
    {
        return _typeNameToClrType.TryGetValue(messageType, out var type) ? type : null;
    }

    public string? GetMessageType<T>() where T : IMessage
    {
        return GetMessageType(typeof(T));
    }

    public string? GetMessageType(Type type)
    {
        return _clrTypeToTypeName.TryGetValue(type, out var messageType) ? messageType : null;
    }
}
