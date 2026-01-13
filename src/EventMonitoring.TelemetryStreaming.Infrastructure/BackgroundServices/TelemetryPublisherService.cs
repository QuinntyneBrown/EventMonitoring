// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using EventMonitoring.TelemetryStreaming.Core.DTOs;
using EventMonitoring.TelemetryStreaming.Core.Interfaces;

namespace EventMonitoring.TelemetryStreaming.Infrastructure.BackgroundServices;

/// <summary>
/// Background service that cyclically generates telemetry per REQ-STREAM-004.
/// Default rate is 200ms (5Hz).
/// </summary>
public class TelemetryPublisherService : BackgroundService
{
    private readonly ILogger<TelemetryPublisherService> logger;
    private readonly ITelemetryGenerator telemetryGenerator;
    private readonly ISubscriptionManager subscriptionManager;
    private readonly ITelemetryPublisher telemetryPublisher;
    private readonly TelemetryStreamingOptions options;

    public TelemetryPublisherService(
        ILogger<TelemetryPublisherService> logger,
        ITelemetryGenerator telemetryGenerator,
        ISubscriptionManager subscriptionManager,
        ITelemetryPublisher telemetryPublisher,
        IOptions<TelemetryStreamingOptions> options)
    {
        this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        this.telemetryGenerator = telemetryGenerator ?? throw new ArgumentNullException(nameof(telemetryGenerator));
        this.subscriptionManager = subscriptionManager ?? throw new ArgumentNullException(nameof(subscriptionManager));
        this.telemetryPublisher = telemetryPublisher ?? throw new ArgumentNullException(nameof(telemetryPublisher));
        this.options = options?.Value ?? new TelemetryStreamingOptions();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Telemetry Publisher Service starting with {Rate}ms generation rate", options.GenerationRateMs);

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                // Generate all telemetry
                var allMessages = telemetryGenerator.GenerateAll();

                // Send to each subscribed client based on their filters per REQ-STREAM-007
                foreach (var message in allMessages)
                {
                    var subscribers = subscriptionManager.GetSubscriptionsForMetric(message.Name);

                    foreach (var subscription in subscribers)
                    {
                        var dto = new TelemetryMessageDto
                        {
                            Name = message.Name,
                            Ust = message.Ust,
                            Value = message.Value
                        };

                        await telemetryPublisher.PublishToClientAsync(subscription.ConnectionId, dto, stoppingToken);
                    }
                }

                // Wait for next cycle - default 200ms (5Hz) per REQ-STREAM-004
                await Task.Delay(options.GenerationRateMs, stoppingToken);
            }
            catch (OperationCanceledException)
            {
                // Expected when stopping
                break;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while publishing telemetry");
                await Task.Delay(1000, stoppingToken); // Back off on error
            }
        }

        logger.LogInformation("Telemetry Publisher Service stopped");
    }
}

public class TelemetryStreamingOptions
{
    /// <summary>
    /// Telemetry generation rate in milliseconds. Default is 200ms (5Hz) per REQ-STREAM-004.
    /// </summary>
    public int GenerationRateMs { get; set; } = 200;
}
