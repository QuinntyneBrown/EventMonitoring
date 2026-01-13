# Event Monitoring System - Administrator Guide

This guide provides system administrators with information for deploying, configuring, and maintaining the Event Monitoring System.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Deployment Requirements](#deployment-requirements)
3. [Service Configuration](#service-configuration)
4. [Database Management](#database-management)
5. [Monitoring and Health Checks](#monitoring-and-health-checks)
6. [Security Considerations](#security-considerations)
7. [Backup and Recovery](#backup-and-recovery)
8. [Scaling Guidelines](#scaling-guidelines)
9. [Maintenance Procedures](#maintenance-procedures)

---

## System Architecture

### Overview

The Event Monitoring System consists of multiple microservices working together:

```
                    ┌──────────────────────────────────────────────────┐
                    │                   FRONTEND                        │
                    │             Angular Application                   │
                    │              (localhost:4200)                      │
                    └────────────────────┬─────────────────────────────┘
                                         │
                                         ▼
                    ┌──────────────────────────────────────────────────┐
                    │                 API GATEWAY                       │
                    │              YARP Reverse Proxy                   │
                    │              (localhost:5000)                      │
                    └──────┬──────────────┬───────────────┬────────────┘
                           │              │               │
              ┌────────────┘              │               └────────────┐
              ▼                           ▼                            ▼
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
│    CONFIGURATION        │ │   HISTORICAL TELEMETRY  │ │  TELEMETRY STREAMING    │
│    MANAGEMENT           │ │        SERVICE          │ │       SERVICE           │
│   (localhost:5001)      │ │   (localhost:5002)      │ │   (localhost:5003)      │
│                         │ │                         │ │                         │
│   - Config Profiles     │ │   - Data Queries        │ │   - SignalR Hub         │
│   - File Management     │ │   - Pagination          │ │   - Subscriptions       │
│                         │ │   - Time Filtering      │ │   - Real-time Streaming │
└───────────┬─────────────┘ └───────────┬─────────────┘ └───────────┬─────────────┘
            │                           │                           │
            ▼                           ▼                           ▼
      ┌───────────┐             ┌───────────┐               ┌───────────┐
      │ SQL Server│             │ SQL Server│               │   Redis   │
      │ (Config)  │             │(Historical)│               │ (Pub/Sub) │
      └───────────┘             └───────────┘               └───────────┘
```

### Service Responsibilities

| Service | Port | Purpose |
|---------|------|---------|
| API Gateway | 5000 | Routes requests, CORS handling, reverse proxy |
| Configuration Management | 5001 | Manages telemetry configuration profiles |
| Historical Telemetry | 5002 | Stores and retrieves historical data |
| Telemetry Streaming | 5003 | Real-time data streaming via SignalR |

---

## Deployment Requirements

### Hardware Requirements

**Minimum (Development/Testing):**
| Resource | Requirement |
|----------|-------------|
| CPU | 4 cores |
| RAM | 8 GB |
| Storage | 50 GB SSD |
| Network | 100 Mbps |

**Recommended (Production):**
| Resource | Requirement |
|----------|-------------|
| CPU | 8+ cores |
| RAM | 32 GB |
| Storage | 500 GB SSD (NVMe preferred) |
| Network | 1 Gbps |

### Software Requirements

| Component | Version |
|-----------|---------|
| .NET Runtime | 8.0 or later |
| Node.js | 20.x LTS |
| SQL Server | 2019+ / SQL Server Express |
| Redis | 7.0+ |
| Docker | 24.0+ (optional) |

### Network Requirements

| Port | Protocol | Direction | Purpose |
|------|----------|-----------|---------|
| 4200 | HTTP | Inbound | Frontend application |
| 5000 | HTTP | Inbound | API Gateway |
| 5001 | HTTP | Internal | Configuration service |
| 5002 | HTTP | Internal | Historical service |
| 5003 | HTTP/WS | Internal | Telemetry streaming |
| 1433 | TCP | Internal | SQL Server |
| 6379 | TCP | Internal | Redis |

---

## Service Configuration

### API Gateway Configuration

**File:** `src/EventMonitoring.ApiGateway/appsettings.json`

```json
{
  "CorsOrigin": "http://localhost:4200",
  "ReverseProxy": {
    "Routes": {
      "configuration-route": {
        "ClusterId": "configuration-cluster",
        "Match": {
          "Path": "/api/configuration/{**catch-all}"
        },
        "Transforms": [
          { "PathRemovePrefix": "/api/configuration" }
        ]
      },
      "historical-route": {
        "ClusterId": "historical-cluster",
        "Match": {
          "Path": "/api/historical/{**catch-all}"
        },
        "Transforms": [
          { "PathRemovePrefix": "/api/historical" }
        ]
      },
      "telemetry-route": {
        "ClusterId": "telemetry-cluster",
        "Match": {
          "Path": "/telemetry/{**catch-all}"
        }
      }
    },
    "Clusters": {
      "configuration-cluster": {
        "Destinations": {
          "destination1": {
            "Address": "http://localhost:5001"
          }
        }
      },
      "historical-cluster": {
        "Destinations": {
          "destination1": {
            "Address": "http://localhost:5002"
          }
        }
      },
      "telemetry-cluster": {
        "Destinations": {
          "destination1": {
            "Address": "http://localhost:5003"
          }
        }
      }
    }
  }
}
```

**Key Settings:**

| Setting | Description | Default |
|---------|-------------|---------|
| `CorsOrigin` | Allowed frontend origin | `http://localhost:4200` |
| `Clusters.*.Address` | Backend service URLs | localhost:500X |

### Configuration Service Settings

**File:** `src/EventMonitoring.ConfigurationManagement.Api/appsettings.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=EventMonitoring_Config;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

### Historical Telemetry Service Settings

**File:** `src/EventMonitoring.HistoricalTelemetry.Api/appsettings.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=EventMonitoring_Historical;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "HistoricalTelemetry": {
    "DefaultPageSize": 100,
    "MaxPageSize": 1000,
    "RetentionDays": 90
  }
}
```

### Telemetry Streaming Service Settings

**File:** `src/EventMonitoring.TelemetryStreaming.Api/appsettings.json`

```json
{
  "ConnectionStrings": {
    "Redis": "localhost:6379"
  },
  "TelemetryStreaming": {
    "DefaultUpdateRateMs": 200,
    "MaxSubscriptionsPerClient": 50
  }
}
```

### Environment Variables

Override configuration with environment variables:

```bash
# API Gateway
export CORS_ORIGIN="https://production.example.com"

# Database Connections
export ConnectionStrings__DefaultConnection="Server=prod-sql;..."

# Redis
export ConnectionStrings__Redis="redis-cluster:6379"

# Logging
export Logging__LogLevel__Default="Warning"
```

---

## Database Management

### Initial Setup

**Configuration Database:**
```sql
-- Create database
CREATE DATABASE EventMonitoring_Config;
GO

-- Run EF Core migrations
cd src/EventMonitoring.ConfigurationManagement.Api
dotnet ef database update
```

**Historical Telemetry Database:**
```sql
-- Create database
CREATE DATABASE EventMonitoring_Historical;
GO

-- Run EF Core migrations
cd src/EventMonitoring.HistoricalTelemetry.Api
dotnet ef database update
```

### Database Schema

**Configuration Database Tables:**
| Table | Description |
|-------|-------------|
| `ConfigurationFiles` | Configuration profile metadata |
| `ConfigurationFileItems` | Individual metrics within profiles |

**Historical Database Tables:**
| Table | Description |
|-------|-------------|
| `HistoricalTelemetryRecords` | Telemetry data points |

**Indexes (Historical Database):**
```sql
-- Optimized for time-range queries
CREATE INDEX IX_Historical_Source_Metric_Timestamp
ON HistoricalTelemetryRecords (Source, MetricName, Timestamp);

-- Optimized for source filtering
CREATE INDEX IX_Historical_Source_Timestamp
ON HistoricalTelemetryRecords (Source, Timestamp);
```

### Data Retention

Configure automatic data cleanup:

```sql
-- Create retention job (SQL Server Agent)
-- Runs daily at 2:00 AM
EXEC sp_add_job @job_name = 'EventMonitoring_DataRetention';

-- Delete records older than retention period
DELETE FROM HistoricalTelemetryRecords
WHERE Timestamp < DATEADD(DAY, -90, GETDATE());
```

### Backup Strategy

**Full Backup (Weekly):**
```bash
sqlcmd -S localhost -Q "BACKUP DATABASE EventMonitoring_Config TO DISK='backup/config_full.bak'"
sqlcmd -S localhost -Q "BACKUP DATABASE EventMonitoring_Historical TO DISK='backup/historical_full.bak'"
```

**Differential Backup (Daily):**
```bash
sqlcmd -S localhost -Q "BACKUP DATABASE EventMonitoring_Historical TO DISK='backup/historical_diff.bak' WITH DIFFERENTIAL"
```

---

## Monitoring and Health Checks

### Health Check Endpoints

Each service exposes health check endpoints:

| Service | Endpoint | Expected Response |
|---------|----------|-------------------|
| API Gateway | `GET /health` | `{"status": "healthy"}` |
| Configuration | `GET /health` | `{"status": "healthy"}` |
| Historical | `GET /health` | `{"status": "healthy"}` |
| Telemetry | `GET /health` | `{"status": "healthy"}` |

### Health Check Script

```bash
#!/bin/bash
# health-check.sh

services=(
    "http://localhost:5000/health:API Gateway"
    "http://localhost:5001/health:Configuration"
    "http://localhost:5002/health:Historical"
    "http://localhost:5003/health:Telemetry"
)

for service in "${services[@]}"; do
    url="${service%%:*}"
    name="${service##*:}"

    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)

    if [ "$response" == "200" ]; then
        echo "✓ $name: Healthy"
    else
        echo "✗ $name: Unhealthy (HTTP $response)"
    fi
done
```

### Metrics to Monitor

**Application Metrics:**
| Metric | Warning | Critical |
|--------|---------|----------|
| API Response Time | > 500ms | > 2000ms |
| Active Connections | > 80% capacity | > 95% capacity |
| Error Rate | > 1% | > 5% |
| Memory Usage | > 80% | > 95% |

**Infrastructure Metrics:**
| Metric | Warning | Critical |
|--------|---------|----------|
| CPU Usage | > 70% | > 90% |
| Disk Usage | > 80% | > 95% |
| Database Connections | > 80% pool | > 95% pool |
| Redis Memory | > 70% | > 90% |

### Logging Configuration

**Production Logging Levels:**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Warning",
      "EventMonitoring": "Information"
    }
  }
}
```

**Log Output (Structured):**
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "Information",
  "service": "TelemetryStreaming",
  "message": "Client subscribed",
  "clientId": "abc123",
  "metrics": ["cpu", "memory"],
  "traceId": "xyz789"
}
```

---

## Security Considerations

### Network Security

**Firewall Rules:**
```
# Allow frontend to API Gateway
ALLOW TCP 4200 -> 5000

# Internal services (should not be exposed externally)
DENY EXTERNAL -> 5001, 5002, 5003
ALLOW INTERNAL -> 5001, 5002, 5003
```

### CORS Configuration

Restrict CORS to known origins:

```json
{
  "CorsOrigin": "https://event-monitoring.example.com"
}
```

For multiple origins:
```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
            "https://event-monitoring.example.com",
            "https://backup.example.com"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});
```

### Database Security

1. **Use Windows Authentication** where possible
2. **Create dedicated service accounts** with minimal permissions
3. **Encrypt connections** using TLS
4. **Regular password rotation** for SQL accounts

```sql
-- Create limited service account
CREATE LOGIN EventMonitoringSvc WITH PASSWORD = 'StrongP@ssw0rd!';
CREATE USER EventMonitoringSvc FOR LOGIN EventMonitoringSvc;

-- Grant minimum required permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA::dbo TO EventMonitoringSvc;
```

### API Security

Future considerations:
- JWT authentication
- API key management
- Rate limiting
- Request validation

---

## Backup and Recovery

### Backup Schedule

| Type | Frequency | Retention |
|------|-----------|-----------|
| Full Database | Weekly | 4 weeks |
| Differential | Daily | 1 week |
| Transaction Log | Hourly | 24 hours |
| Configuration Files | On change | 30 versions |

### Recovery Procedures

**Service Recovery:**
```bash
# 1. Stop affected service
systemctl stop eventmonitoring-telemetry

# 2. Check logs for error cause
journalctl -u eventmonitoring-telemetry -n 100

# 3. Fix configuration if needed
# 4. Restart service
systemctl start eventmonitoring-telemetry

# 5. Verify health
curl http://localhost:5003/health
```

**Database Recovery:**
```sql
-- Restore from full backup
RESTORE DATABASE EventMonitoring_Historical
FROM DISK = 'backup/historical_full.bak'
WITH RECOVERY;

-- Or restore to point in time
RESTORE DATABASE EventMonitoring_Historical
FROM DISK = 'backup/historical_full.bak'
WITH NORECOVERY;

RESTORE LOG EventMonitoring_Historical
FROM DISK = 'backup/historical_log.trn'
WITH RECOVERY, STOPAT = '2024-01-15 10:00:00';
```

### Disaster Recovery

**RTO/RPO Targets:**
| Scenario | RTO | RPO |
|----------|-----|-----|
| Service failure | 15 minutes | 0 (no data loss) |
| Database failure | 1 hour | 1 hour |
| Full system failure | 4 hours | 1 day |

---

## Scaling Guidelines

### Horizontal Scaling

**Telemetry Streaming Service:**
- Can run multiple instances behind load balancer
- Requires sticky sessions for WebSocket connections
- Redis Pub/Sub handles cross-instance communication

**Configuration Service:**
- Stateless, easily scalable
- Add instances behind load balancer

**Historical Telemetry Service:**
- Stateless, easily scalable
- Consider database read replicas for high query loads

### Vertical Scaling

**When to Scale Up:**
| Indicator | Action |
|-----------|--------|
| CPU consistently > 70% | Add more cores |
| Memory consistently > 80% | Add more RAM |
| Database I/O bottleneck | Move to faster storage |

### Load Balancer Configuration

```nginx
# nginx.conf example
upstream telemetry_streaming {
    ip_hash;  # Sticky sessions for WebSocket
    server telemetry1:5003;
    server telemetry2:5003;
}

upstream api_services {
    server config1:5001;
    server config2:5001;
}

server {
    location /telemetry {
        proxy_pass http://telemetry_streaming;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## Maintenance Procedures

### Routine Maintenance

**Daily:**
- [ ] Review health check status
- [ ] Check error logs for anomalies
- [ ] Verify backup completion

**Weekly:**
- [ ] Review performance metrics
- [ ] Check disk space usage
- [ ] Validate database backups

**Monthly:**
- [ ] Apply security patches
- [ ] Review and rotate credentials
- [ ] Test disaster recovery procedures
- [ ] Archive old log files

### Service Restart Procedure

```bash
# Graceful restart (one service)
systemctl restart eventmonitoring-config

# Full system restart (ordered)
systemctl stop eventmonitoring-gateway
systemctl stop eventmonitoring-telemetry
systemctl stop eventmonitoring-historical
systemctl stop eventmonitoring-config

systemctl start eventmonitoring-config
systemctl start eventmonitoring-historical
systemctl start eventmonitoring-telemetry
systemctl start eventmonitoring-gateway
```

### Update Procedure

1. **Notify Users**
   - Schedule maintenance window
   - Send advance notification

2. **Backup**
   ```bash
   ./scripts/backup-all.sh
   ```

3. **Deploy Updates**
   ```bash
   # Pull latest code
   git pull origin main

   # Build services
   dotnet build -c Release

   # Run migrations
   dotnet ef database update

   # Restart services
   ./scripts/restart-all.sh
   ```

4. **Verify**
   ```bash
   ./scripts/health-check.sh
   ```

5. **Monitor**
   - Watch logs for errors
   - Verify user access
   - Check performance metrics

### Emergency Procedures

**Service Unresponsive:**
```bash
# Force stop if graceful stop fails
systemctl kill -s SIGKILL eventmonitoring-telemetry

# Check for zombie processes
ps aux | grep dotnet

# Clear any stuck resources
# Restart service
systemctl start eventmonitoring-telemetry
```

**Database Connection Issues:**
```bash
# Test database connectivity
sqlcmd -S localhost -Q "SELECT 1"

# Check connection pool status
# Review database error logs
# Restart services to reset connections
```

---

## Quick Reference Commands

### Service Management
```bash
# Status
systemctl status eventmonitoring-*

# Start all
systemctl start eventmonitoring-{config,historical,telemetry,gateway}

# Stop all
systemctl stop eventmonitoring-{gateway,telemetry,historical,config}

# Logs
journalctl -u eventmonitoring-telemetry -f
```

### Database
```bash
# Connect to SQL Server
sqlcmd -S localhost -d EventMonitoring_Config

# Check database size
SELECT name, size * 8 / 1024 as 'Size (MB)' FROM sys.database_files;

# Active connections
SELECT COUNT(*) FROM sys.dm_exec_sessions WHERE database_id = DB_ID();
```

### Redis
```bash
# Connect to Redis
redis-cli

# Check memory usage
INFO memory

# Monitor pub/sub
PSUBSCRIBE *
```

---

*Event Monitoring System Administrator Guide - Version 1.0*
