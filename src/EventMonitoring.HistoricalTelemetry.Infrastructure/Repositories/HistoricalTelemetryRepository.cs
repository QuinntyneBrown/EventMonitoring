// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using EventMonitoring.HistoricalTelemetry.Core.Entities;
using EventMonitoring.HistoricalTelemetry.Core.Interfaces;
using EventMonitoring.HistoricalTelemetry.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EventMonitoring.HistoricalTelemetry.Infrastructure.Repositories;

public class HistoricalTelemetryRepository : IHistoricalTelemetryRepository
{
    private readonly HistoricalTelemetryDbContext context;

    public HistoricalTelemetryRepository(HistoricalTelemetryDbContext context)
    {
        this.context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task<HistoricalTelemetryRecord> AddAsync(HistoricalTelemetryRecord record, CancellationToken cancellationToken = default)
    {
        await context.TelemetryRecords.AddAsync(record, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
        return record;
    }

    /// <summary>
    /// Bulk insert using AddRangeAsync per REQ-HIST-002.
    /// </summary>
    public async Task AddRangeAsync(IEnumerable<HistoricalTelemetryRecord> records, CancellationToken cancellationToken = default)
    {
        await context.TelemetryRecords.AddRangeAsync(records, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<IEnumerable<HistoricalTelemetryRecord>> GetBySourceAsync(string source, DateTime startTime, DateTime endTime, int page, int pageSize, CancellationToken cancellationToken = default)
    {
        return await context.TelemetryRecords
            .Where(x => x.Source == source && x.Timestamp >= startTime && x.Timestamp <= endTime)
            .OrderByDescending(x => x.Timestamp)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<HistoricalTelemetryRecord>> GetByMetricAsync(string metricName, DateTime startTime, DateTime endTime, int page, int pageSize, CancellationToken cancellationToken = default)
    {
        return await context.TelemetryRecords
            .Where(x => x.MetricName == metricName && x.Timestamp >= startTime && x.Timestamp <= endTime)
            .OrderByDescending(x => x.Timestamp)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<HistoricalTelemetryRecord>> GetBySourceAndMetricAsync(string source, string metricName, DateTime startTime, DateTime endTime, int page, int pageSize, CancellationToken cancellationToken = default)
    {
        return await context.TelemetryRecords
            .Where(x => x.Source == source && x.MetricName == metricName && x.Timestamp >= startTime && x.Timestamp <= endTime)
            .OrderByDescending(x => x.Timestamp)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetCountAsync(string? source, string? metricName, DateTime startTime, DateTime endTime, CancellationToken cancellationToken = default)
    {
        var query = context.TelemetryRecords.Where(x => x.Timestamp >= startTime && x.Timestamp <= endTime);

        if (!string.IsNullOrEmpty(source))
        {
            query = query.Where(x => x.Source == source);
        }

        if (!string.IsNullOrEmpty(metricName))
        {
            query = query.Where(x => x.MetricName == metricName);
        }

        return await query.CountAsync(cancellationToken);
    }
}