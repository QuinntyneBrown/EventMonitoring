// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static void AddApiGatewayServices(this IServiceCollection services, IConfiguration configuration)
    {
        var corsOrigin = configuration["CorsOrigin"] ?? "http://localhost:4200";
        
        services.AddCors(options => options.AddPolicy("CorsPolicy",
            builder => builder
            .WithOrigins(corsOrigin)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowed(isOriginAllowed: _ => true)
            .AllowCredentials()));
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        
        // Add YARP reverse proxy
        services.AddReverseProxy()
            .LoadFromConfig(configuration.GetSection("ReverseProxy"));
    }
}