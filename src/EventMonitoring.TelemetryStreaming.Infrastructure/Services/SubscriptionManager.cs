// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using System.Collections.Concurrent;
using EventMonitoring.TelemetryStreaming.Core.Entities;
using EventMonitoring.TelemetryStreaming.Core.Interfaces;

namespace EventMonitoring.TelemetryStreaming.Infrastructure.Services;

/// <summary>
/// In-memory subscription manager per REQ-STREAM-003.
/// </summary>
public class SubscriptionManager : ISubscriptionManager
{
    private readonly ConcurrentDictionary<string, TelemetrySubscription> subscriptions = new();

    public TelemetrySubscription CreateSubscription(string connectionId, string clientId)
    {
        var subscription = new TelemetrySubscription
        {
            SubscriptionId = Guid.NewGuid(),
            ConnectionId = connectionId,
            ClientId = clientId,
            CreatedAt = DateTime.UtcNow,
            IsActive = true
        };

        subscriptions.TryAdd(connectionId, subscription);
        return subscription;
    }

    public void UpdateSubscription(Guid subscriptionId, List<string> metrics, List<string> sources, int updateRate)
    {
        var subscription = subscriptions.Values.FirstOrDefault(s => s.SubscriptionId == subscriptionId);
        if (subscription != null)
        {
            subscription.SubscribedMetrics = metrics;
            subscription.SubscribedSources = sources;
            subscription.UpdateRateMs = updateRate;
            subscription.LastUpdateAt = DateTime.UtcNow;
        }
    }

    public TelemetrySubscription? GetSubscription(string connectionId)
    {
        subscriptions.TryGetValue(connectionId, out var subscription);
        return subscription;
    }

    public void RemoveSubscription(string connectionId)
    {
        subscriptions.TryRemove(connectionId, out _);
    }

    public IEnumerable<TelemetrySubscription> GetActiveSubscriptions()
    {
        return subscriptions.Values.Where(s => s.IsActive);
    }

    public IEnumerable<TelemetrySubscription> GetSubscriptionsForMetric(string metricName)
    {
        return subscriptions.Values.Where(s =>
            s.IsActive &&
            (s.SubscribedMetrics.Count == 0 || s.SubscribedMetrics.Contains(metricName)));
    }
}