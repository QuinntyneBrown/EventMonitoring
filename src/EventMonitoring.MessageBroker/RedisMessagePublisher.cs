// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.Extensions.Logging;
using StackExchange.Redis;

namespace EventMonitoring.MessageBroker;

/// <summary>
/// Redis-based implementation of <see cref="IMessagePublisher"/>.
/// </summary>
public sealed class RedisMessagePublisher : IMessagePublisher
{
    private readonly IConnectionMultiplexer _redis;
    private readonly IMessageSerializer _serializer;
    private readonly IMessageTypeRegistry _typeRegistry;
    private readonly ILogger<RedisMessagePublisher> _logger;
    private readonly string _sourceService;

    public RedisMessagePublisher(
        IConnectionMultiplexer redis,
        IMessageSerializer serializer,
        IMessageTypeRegistry typeRegistry,
        ILogger<RedisMessagePublisher> logger,
        string sourceService)
    {
        _redis = redis ?? throw new ArgumentNullException(nameof(redis));
        _serializer = serializer ?? throw new ArgumentNullException(nameof(serializer));
        _typeRegistry = typeRegistry ?? throw new ArgumentNullException(nameof(typeRegistry));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _sourceService = sourceService ?? throw new ArgumentNullException(nameof(sourceService));
    }

    public async Task PublishAsync<T>(string channel, T message, CancellationToken cancellationToken = default)
        where T : IMessage
    {
        if (string.IsNullOrWhiteSpace(channel))
            throw new ArgumentException("Channel cannot be null or whitespace.", nameof(channel));
        
        if (message == null)
            throw new ArgumentNullException(nameof(message));

        // Get message type name from registry
        var messageType = _typeRegistry.GetMessageType<T>();
        if (messageType == null)
        {
            throw new InvalidOperationException($"Message type {typeof(T).Name} is not registered.");
        }

        // Create message envelope with header
        var envelope = new MessageEnvelope<T>
        {
            Header = new MessageHeader
            {
                MessageType = messageType,
                MessageId = Guid.NewGuid().ToString(),
                CorrelationId = Guid.NewGuid().ToString(), // TODO: Get from context if available
                TimestampUnixMs = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(),
                SourceService = _sourceService,
                SchemaVersion = 1
            },
            Payload = message
        };

        // Serialize the envelope
        var data = _serializer.Serialize(envelope);

        // Publish to Redis
        var subscriber = _redis.GetSubscriber();
        await subscriber.PublishAsync(RedisChannel.Literal(channel), data);

        _logger.LogDebug(
            "Published message {MessageType} with ID {MessageId} to channel {Channel}",
            messageType,
            envelope.Header.MessageId,
            channel);
    }
}
