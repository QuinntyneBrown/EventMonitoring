// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using StackExchange.Redis;

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Extension methods for configuring message broker services.
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Adds message broker services to the service collection.
    /// </summary>
    /// <param name="services">The service collection.</param>
    /// <param name="configureOptions">Optional action to configure message broker options.</param>
    /// <returns>The service collection for method chaining.</returns>
    public static IServiceCollection AddMessageBroker(
        this IServiceCollection services,
        Action<MessageBrokerOptions>? configureOptions = null)
    {
        // Configure options
        var options = new MessageBrokerOptions();
        configureOptions?.Invoke(options);
        services.AddSingleton(Options.Create(options));

        // Register Redis connection
        services.AddSingleton<IConnectionMultiplexer>(sp =>
        {
            var opts = sp.GetRequiredService<IOptions<MessageBrokerOptions>>().Value;
            return ConnectionMultiplexer.Connect(opts.RedisConnectionString);
        });

        // Register message broker services
        services.AddSingleton<IMessageTypeRegistry, MessageTypeRegistry>();
        services.AddSingleton<IMessageSerializer, MessagePackSerializer>();
        services.AddSingleton<IMessageContextAccessor, MessageContextAccessor>();
        services.AddSingleton<IMessagePublisher>(sp =>
        {
            var redis = sp.GetRequiredService<IConnectionMultiplexer>();
            var serializer = sp.GetRequiredService<IMessageSerializer>();
            var typeRegistry = sp.GetRequiredService<IMessageTypeRegistry>();
            var contextAccessor = sp.GetRequiredService<IMessageContextAccessor>();
            var logger = sp.GetRequiredService<Microsoft.Extensions.Logging.ILogger<RedisMessagePublisher>>();
            var opts = sp.GetRequiredService<IOptions<MessageBrokerOptions>>().Value;
            
            return new RedisMessagePublisher(redis, serializer, typeRegistry, contextAccessor, logger, opts.ServiceName);
        });

        return services;
    }
}
