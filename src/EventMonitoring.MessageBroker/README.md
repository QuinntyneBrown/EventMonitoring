# EventMonitoring.MessageBroker

A high-performance message broker library for EventMonitoring microservices, implementing Redis Pub/Sub based messaging with MessagePack serialization.

## Overview

This library provides the core messaging infrastructure for the EventMonitoring system, supporting:
- Redis Pub/Sub for inter-service communication
- MessagePack serialization with LZ4 compression
- Message envelope pattern with standardized headers
- Type-safe message handlers
- Distributed tracing support

## Architecture

The library follows the specifications defined in:
- `docs/specs/message-design.spec.md` - Message envelope and serialization design
- `docs/specs/subscription-design.spec.md` - Subscription and routing patterns

### Key Components

#### Message Infrastructure
- **IMessage**: Marker interface for all messages
- **IDomainEvent**: Interface for domain events (something that happened)
- **ICommand**: Interface for commands (intention to perform an action)
- **MessageHeader**: Standard header with routing, tracing, and idempotency metadata
- **MessageEnvelope<T>**: Generic wrapper separating transport concerns from business payload

#### Serialization
- **IMessageSerializer**: Interface for message serialization/deserialization
- **MessagePackSerializer**: MessagePack implementation with LZ4 compression
- **MessageTypeRegistry**: Bidirectional mapping between message type names and CLR types

#### Publishing
- **IMessagePublisher**: Interface for publishing messages to Redis channels
- **RedisMessagePublisher**: Redis-based implementation

#### Handling
- **IMessageHandler<T>**: Interface for message handlers
- **MessageHandlerBase<T>**: Base class providing common handler functionality
- **MessageContext**: Context information available during message processing

## Usage

### 1. Configure Services

```csharp
services.AddMessageBroker(options =>
{
    options.RedisConnectionString = "localhost:6379";
    options.ServiceName = "MyService";
});
```

### 2. Define a Message

```csharp
using MessagePack;

[MessagePackObject]
public sealed class TelemetryReceivedEvent : IDomainEvent
{
    [Key(0)]
    public required string TelemetryId { get; init; }
    
    [Key(1)]
    public required string MetricName { get; init; }
    
    [Key(2)]
    public required double Value { get; init; }
    
    [IgnoreMember]
    public string AggregateId => TelemetryId;
    
    [IgnoreMember]
    public string AggregateType => "Telemetry";
}
```

### 3. Register Message Types

```csharp
var registry = serviceProvider.GetRequiredService<IMessageTypeRegistry>();
registry.Register<TelemetryReceivedEvent>("telemetry.received.v1");
```

### 4. Publish Messages

```csharp
public class MyService
{
    private readonly IMessagePublisher _publisher;
    
    public MyService(IMessagePublisher publisher)
    {
        _publisher = publisher;
    }
    
    public async Task PublishTelemetry(string id, string metric, double value)
    {
        var message = new TelemetryReceivedEvent
        {
            TelemetryId = id,
            MetricName = metric,
            Value = value
        };
        
        await _publisher.PublishAsync("telemetry.received.v1", message);
    }
}
```

### 5. Create a Message Handler

```csharp
public class TelemetryReceivedHandler : MessageHandlerBase<TelemetryReceivedEvent>
{
    private readonly ILogger<TelemetryReceivedHandler> _logger;
    
    public TelemetryReceivedHandler(ILogger<TelemetryReceivedHandler> logger)
        : base(logger)
    {
        _logger = logger;
    }
    
    public override async Task HandleAsync(
        TelemetryReceivedEvent message,
        MessageContext context,
        CancellationToken cancellationToken)
    {
        LogHandling(message, context);
        
        // Process the message
        _logger.LogInformation(
            "Processing telemetry {MetricName} = {Value}",
            message.MetricName,
            message.Value);
    }
}
```

## Message Header Fields

Every message envelope includes a header with the following fields:

- **MessageType**: Message type name for type discrimination
- **MessageId**: Unique identifier (GUID) for idempotency
- **CorrelationId**: Identifier for distributed tracing
- **CausationId**: MessageId of the message that caused this message
- **TimestampUnixMs**: Creation timestamp in Unix milliseconds
- **SourceService**: Name of the service that published the message
- **SchemaVersion**: Schema version of the message payload
- **Metadata**: Optional extensibility dictionary

## Dependencies

- **MessagePack**: High-performance binary serialization
- **StackExchange.Redis**: Redis client for pub/sub
- **Microsoft.Extensions.Hosting**: Background service abstractions
- **Microsoft.Extensions.DependencyInjection**: Dependency injection support

## Requirements Compliance

This implementation satisfies the following requirements:
- REQ-ARCH-004: Redis-based message broker with pub/sub semantics
- REQ-MSG-001 to REQ-MSG-010: Message design specifications
- Message envelope pattern with standardized headers
- MessagePack serialization with LZ4 compression
- Type registry for message discrimination

## Future Enhancements

The following features are planned but deferred for minimal implementation:
- Background worker for automatic subscription processing
- Subscription registry and builder pattern
- Idempotency store implementation
- Cycle detection for event chains
- Retry policies with exponential backoff
- Dead-letter queue support
