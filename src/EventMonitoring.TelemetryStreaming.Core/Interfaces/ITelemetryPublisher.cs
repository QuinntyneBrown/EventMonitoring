// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using EventMonitoring.TelemetryStreaming.Core.DTOs;

namespace EventMonitoring.TelemetryStreaming.Core.Interfaces;

/// <summary>
/// Interface for publishing telemetry to clients.
/// </summary>
public interface ITelemetryPublisher
{
    Task PublishToClientAsync(string connectionId, TelemetryMessageDto message, CancellationToken cancellationToken = default);
}
