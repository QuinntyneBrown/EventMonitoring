// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using EventMonitoring.HistoricalTelemetry.Core.Interfaces;
using EventMonitoring.HistoricalTelemetry.Core.Options;
using EventMonitoring.HistoricalTelemetry.Infrastructure.BackgroundServices;
using EventMonitoring.HistoricalTelemetry.Infrastructure.Data;
using EventMonitoring.HistoricalTelemetry.Infrastructure.Repositories;
using EventMonitoring.HistoricalTelemetry.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EventMonitoring.HistoricalTelemetry.Infrastructure;

public static class ConfigureServices
{
    /// <summary>
    /// Configure services using Options pattern per REQ-HIST-006.
    /// </summary>
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Options pattern per REQ-HIST-006
        services.Configure<HistoricalTelemetryOptions>(
            configuration.GetSection(HistoricalTelemetryOptions.SectionName));

        // Database connection using Options pattern
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<HistoricalTelemetryDbContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddScoped<IHistoricalTelemetryRepository, HistoricalTelemetryRepository>();
        services.AddScoped<ITelemetryPersistenceService, TelemetryPersistenceService>();
        services.AddHostedService<TelemetryListenerService>();

        return services;
    }
}