// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using EventMonitoring.TelemetryStreaming.Core.Entities;

namespace EventMonitoring.TelemetryStreaming.Core.Interfaces;

public interface ISubscriptionManager
{
    TelemetrySubscription CreateSubscription(string connectionId, string clientId);
    void UpdateSubscription(Guid subscriptionId, List<string> metrics, List<string> sources, int updateRate);
    TelemetrySubscription? GetSubscription(string connectionId);
    void RemoveSubscription(string connectionId);
    IEnumerable<TelemetrySubscription> GetActiveSubscriptions();
    IEnumerable<TelemetrySubscription> GetSubscriptionsForMetric(string metricName);
}