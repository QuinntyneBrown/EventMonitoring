// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using EventMonitoring.ConfigurationManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace EventMonitoring.ConfigurationManagement.Infrastructure.Data;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(ConfigurationManagementDbContext context)
    {
        if (await context.ConfigurationFiles.AnyAsync())
        {
            return; // Database already seeded
        }

        var configurationFiles = new List<ConfigurationFile>
        {
            new ConfigurationFile
            {
                ConfigurationFileId = Guid.NewGuid(),
                Name = "Application Settings",
                Path = "/config/appsettings.json",
                ContentType = "application/json",
                Description = "Main application configuration settings",
                Version = "1.0.0",
                Items = new List<ConfigurationFileItem>
                {
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "AppName", Value = "EventMonitoring", ValueType = ConfigurationValueType.String },
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "MaxConnections", Value = "100", ValueType = ConfigurationValueType.Integer },
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "EnableLogging", Value = "true", ValueType = ConfigurationValueType.Boolean }
                }
            },
            new ConfigurationFile
            {
                ConfigurationFileId = Guid.NewGuid(),
                Name = "Telemetry Settings",
                Path = "/config/telemetry.json",
                ContentType = "application/json",
                Description = "Telemetry streaming configuration",
                Version = "1.0.0",
                Items = new List<ConfigurationFileItem>
                {
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "UpdateRateMs", Value = "200", ValueType = ConfigurationValueType.Integer },
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "BufferSize", Value = "1000", ValueType = ConfigurationValueType.Integer }
                }
            },
            new ConfigurationFile
            {
                ConfigurationFileId = Guid.NewGuid(),
                Name = "Database Settings",
                Path = "/config/database.json",
                ContentType = "application/json",
                Description = "Database connection and pool settings",
                Version = "1.0.0",
                Items = new List<ConfigurationFileItem>
                {
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "ConnectionTimeout", Value = "30", ValueType = ConfigurationValueType.Integer },
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "MaxPoolSize", Value = "50", ValueType = ConfigurationValueType.Integer }
                }
            },
            new ConfigurationFile
            {
                ConfigurationFileId = Guid.NewGuid(),
                Name = "Logging Configuration",
                Path = "/config/logging.json",
                ContentType = "application/json",
                Description = "Logging levels and output configuration",
                Version = "1.0.0",
                Items = new List<ConfigurationFileItem>
                {
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "MinLevel", Value = "Information", ValueType = ConfigurationValueType.String },
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "WriteToFile", Value = "true", ValueType = ConfigurationValueType.Boolean }
                }
            },
            new ConfigurationFile
            {
                ConfigurationFileId = Guid.NewGuid(),
                Name = "Security Settings",
                Path = "/config/security.json",
                ContentType = "application/json",
                Description = "Security and authentication configuration",
                Version = "1.0.0",
                Items = new List<ConfigurationFileItem>
                {
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "TokenExpiryMinutes", Value = "60", ValueType = ConfigurationValueType.Integer },
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "RequireHttps", Value = "true", ValueType = ConfigurationValueType.Boolean }
                }
            },
            new ConfigurationFile
            {
                ConfigurationFileId = Guid.NewGuid(),
                Name = "Redis Cache Settings",
                Path = "/config/redis.json",
                ContentType = "application/json",
                Description = "Redis cache and pub/sub configuration",
                Version = "1.0.0",
                Items = new List<ConfigurationFileItem>
                {
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "Host", Value = "localhost", ValueType = ConfigurationValueType.String },
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "Port", Value = "6379", ValueType = ConfigurationValueType.Integer }
                }
            },
            new ConfigurationFile
            {
                ConfigurationFileId = Guid.NewGuid(),
                Name = "API Gateway Settings",
                Path = "/config/gateway.json",
                ContentType = "application/json",
                Description = "API Gateway routing and CORS configuration",
                Version = "1.0.0",
                Items = new List<ConfigurationFileItem>
                {
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "CorsOrigin", Value = "http://localhost:4200", ValueType = ConfigurationValueType.String },
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "RateLimitPerMinute", Value = "1000", ValueType = ConfigurationValueType.Integer }
                }
            },
            new ConfigurationFile
            {
                ConfigurationFileId = Guid.NewGuid(),
                Name = "Historical Data Settings",
                Path = "/config/historical.json",
                ContentType = "application/json",
                Description = "Historical telemetry storage configuration",
                Version = "1.0.0",
                Items = new List<ConfigurationFileItem>
                {
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "RetentionDays", Value = "90", ValueType = ConfigurationValueType.Integer },
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "PageSize", Value = "100", ValueType = ConfigurationValueType.Integer }
                }
            },
            new ConfigurationFile
            {
                ConfigurationFileId = Guid.NewGuid(),
                Name = "Dashboard Settings",
                Path = "/config/dashboard.json",
                ContentType = "application/json",
                Description = "Dashboard layout and tile configuration",
                Version = "1.0.0",
                Items = new List<ConfigurationFileItem>
                {
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "DefaultColumns", Value = "12", ValueType = ConfigurationValueType.Integer },
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "AnimationEnabled", Value = "true", ValueType = ConfigurationValueType.Boolean }
                }
            },
            new ConfigurationFile
            {
                ConfigurationFileId = Guid.NewGuid(),
                Name = "Space Vehicle Telemetry",
                Path = "/config/vehicle-telemetry.json",
                ContentType = "application/json",
                Description = "Space vehicle telemetry types and thresholds",
                Version = "1.0.0",
                Items = new List<ConfigurationFileItem>
                {
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "TelemetryTypes", Value = "50", ValueType = ConfigurationValueType.Integer },
                    new ConfigurationFileItem { ConfigurationFileItemId = Guid.NewGuid(), Key = "AlertThreshold", Value = "0.95", ValueType = ConfigurationValueType.String }
                }
            }
        };

        await context.ConfigurationFiles.AddRangeAsync(configurationFiles);
        await context.SaveChangesAsync();
    }
}