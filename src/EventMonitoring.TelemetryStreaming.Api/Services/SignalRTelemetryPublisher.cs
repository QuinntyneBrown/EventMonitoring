// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.AspNetCore.SignalR;
using EventMonitoring.TelemetryStreaming.Api.Hubs;
using EventMonitoring.TelemetryStreaming.Core.DTOs;
using EventMonitoring.TelemetryStreaming.Core.Interfaces;

namespace EventMonitoring.TelemetryStreaming.Api.Services;

/// <summary>
/// SignalR implementation of ITelemetryPublisher.
/// </summary>
public class SignalRTelemetryPublisher : ITelemetryPublisher
{
    private readonly IHubContext<TelemetryHub> hubContext;

    public SignalRTelemetryPublisher(IHubContext<TelemetryHub> hubContext)
    {
        this.hubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));
    }

    public async Task PublishToClientAsync(string connectionId, TelemetryMessageDto message, CancellationToken cancellationToken = default)
    {
        await hubContext.Clients.Client(connectionId).SendAsync("ReceiveTelemetry", message, cancellationToken);
    }
}
