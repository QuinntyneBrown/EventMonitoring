// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using EventMonitoring.TelemetryStreaming.Core.Interfaces;
using EventMonitoring.TelemetryStreaming.Infrastructure.BackgroundServices;
using EventMonitoring.TelemetryStreaming.Infrastructure.Services;

namespace EventMonitoring.TelemetryStreaming.Infrastructure;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<TelemetryStreamingOptions>(configuration.GetSection("TelemetryStreaming"));

        services.AddSingleton<ITelemetryGenerator, TelemetryGenerator>();
        services.AddSingleton<ISubscriptionManager, SubscriptionManager>();
        services.AddHostedService<TelemetryPublisherService>();

        return services;
    }
}