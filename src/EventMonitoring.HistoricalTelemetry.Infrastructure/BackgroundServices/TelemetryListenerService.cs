// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using EventMonitoring.HistoricalTelemetry.Core.Entities;
using EventMonitoring.HistoricalTelemetry.Core.Interfaces;
using EventMonitoring.HistoricalTelemetry.Core.Options;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace EventMonitoring.HistoricalTelemetry.Infrastructure.BackgroundServices;

/// <summary>
/// Background listener scaffold for Redis Pub/Sub per REQ-HIST-004.
/// Persists telemetry received via message broker to database per REQ-HIST-007.
/// </summary>
public class TelemetryListenerService : BackgroundService
{
    private readonly ILogger<TelemetryListenerService> logger;
    private readonly ITelemetryPersistenceService persistenceService;
    private readonly HistoricalTelemetryOptions options;

    public TelemetryListenerService(
        ILogger<TelemetryListenerService> logger,
        ITelemetryPersistenceService persistenceService,
        IOptions<HistoricalTelemetryOptions> options)
    {
        this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        this.persistenceService = persistenceService ?? throw new ArgumentNullException(nameof(persistenceService));
        this.options = options?.Value ?? new HistoricalTelemetryOptions();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Telemetry Listener Service is starting. Channel: {Channel}, Redis: {Redis}",
            options.TelemetryChannel, options.RedisConnectionString);

        // This is a scaffold for Redis Pub/Sub listener per REQ-HIST-004
        // In a real implementation, this would subscribe to a Redis channel
        // and persist incoming telemetry messages to the database per REQ-HIST-007

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                // Scaffold: In production, replace with Redis Pub/Sub subscription:
                // var redis = ConnectionMultiplexer.Connect(options.RedisConnectionString);
                // var subscriber = redis.GetSubscriber();
                // await subscriber.SubscribeAsync(options.TelemetryChannel, async (channel, message) => {
                //     var record = JsonSerializer.Deserialize<HistoricalTelemetryRecord>(message);
                //     await persistenceService.PersistTelemetryAsync(record, stoppingToken);
                // });

                await Task.Delay(options.BatchIntervalMs, stoppingToken);
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while listening for telemetry messages");
                await Task.Delay(1000, stoppingToken);
            }
        }

        logger.LogInformation("Telemetry Listener Service is stopping");
    }
}