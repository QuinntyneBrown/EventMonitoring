// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Options for configuring the message broker.
/// </summary>
public sealed class MessageBrokerOptions
{
    /// <summary>
    /// Gets or sets the Redis connection string.
    /// </summary>
    public string RedisConnectionString { get; set; } = "localhost:6379";

    /// <summary>
    /// Gets or sets the name of the service for message source identification.
    /// </summary>
    public string ServiceName { get; set; } = "Unknown";
}
