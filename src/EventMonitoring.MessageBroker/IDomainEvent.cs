// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Marker interface for domain events.
/// Domain events represent something that has happened in the past.
/// </summary>
public interface IDomainEvent : IMessage
{
    /// <summary>
    /// Gets the identifier of the aggregate that this event relates to.
    /// </summary>
    string AggregateId { get; }

    /// <summary>
    /// Gets the type of the aggregate that this event relates to.
    /// </summary>
    string AggregateType { get; }
}
