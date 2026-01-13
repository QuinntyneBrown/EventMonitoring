// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.AspNetCore.SignalR;
using EventMonitoring.TelemetryStreaming.Core.DTOs;
using EventMonitoring.TelemetryStreaming.Core.Interfaces;

namespace EventMonitoring.TelemetryStreaming.Api.Hubs;

/// <summary>
/// SignalR hub for telemetry streaming per REQ-STREAM-001.
/// Mapped to /telemetry endpoint.
/// </summary>
public class TelemetryHub : Hub
{
    private readonly ILogger<TelemetryHub> logger;
    private readonly ISubscriptionManager subscriptionManager;

    public TelemetryHub(
        ILogger<TelemetryHub> logger,
        ISubscriptionManager subscriptionManager)
    {
        this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        this.subscriptionManager = subscriptionManager ?? throw new ArgumentNullException(nameof(subscriptionManager));
    }

    public override async Task OnConnectedAsync()
    {
        logger.LogInformation("Client connected: {ConnectionId}", Context.ConnectionId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        logger.LogInformation("Client disconnected: {ConnectionId}", Context.ConnectionId);
        subscriptionManager.RemoveSubscription(Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }

    /// <summary>
    /// Subscribe to telemetry per REQ-STREAM-002.
    /// </summary>
    public async Task Subscribe(SubscriptionRequestDto request)
    {
        logger.LogInformation("Client {ClientId} subscribing to metrics: {Metrics}",
            request.ClientId, string.Join(", ", request.Metrics));

        var subscription = subscriptionManager.CreateSubscription(Context.ConnectionId, request.ClientId);
        subscriptionManager.UpdateSubscription(
            subscription.SubscriptionId,
            request.Metrics,
            request.Sources,
            request.UpdateRateMs);

        await Clients.Caller.SendAsync("SubscriptionConfirmed", subscription.SubscriptionId);
    }

    /// <summary>
    /// Unsubscribe from telemetry per REQ-STREAM-002.
    /// </summary>
    public async Task Unsubscribe()
    {
        logger.LogInformation("Client {ConnectionId} unsubscribing from telemetry", Context.ConnectionId);
        subscriptionManager.RemoveSubscription(Context.ConnectionId);
        await Clients.Caller.SendAsync("UnsubscriptionConfirmed");
    }

    /// <summary>
    /// Update existing subscription.
    /// </summary>
    public async Task UpdateSubscription(SubscriptionRequestDto request)
    {
        logger.LogInformation("Client updating subscription: {ConnectionId}", Context.ConnectionId);
        var subscription = subscriptionManager.GetSubscription(Context.ConnectionId);

        if (subscription != null)
        {
            subscriptionManager.UpdateSubscription(
                subscription.SubscriptionId,
                request.Metrics,
                request.Sources,
                request.UpdateRateMs);

            await Clients.Caller.SendAsync("SubscriptionUpdated");
        }
    }
}