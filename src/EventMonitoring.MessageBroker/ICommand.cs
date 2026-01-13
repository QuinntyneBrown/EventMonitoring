// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Marker interface for commands.
/// Commands represent an intention to perform an action.
/// </summary>
public interface ICommand : IMessage
{
    /// <summary>
    /// Gets the identifier of the target entity for this command.
    /// </summary>
    string TargetId { get; }
}
