// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using EventMonitoring.ConfigurationManagement.Core.Interfaces;
using EventMonitoring.ConfigurationManagement.Infrastructure.Data;
using EventMonitoring.ConfigurationManagement.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EventMonitoring.ConfigurationManagement.Infrastructure;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ConfigurationManagementDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IConfigurationFileRepository, ConfigurationFileRepository>();
        services.AddScoped<IConfigurationFileItemRepository, ConfigurationFileItemRepository>();

        return services;
    }
}