// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using EventMonitoring.HistoricalTelemetry.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventMonitoring.HistoricalTelemetry.Infrastructure.Data.Configurations;

/// <summary>
/// Configuration with index-optimized queries for Source, MetricName, Timestamp per REQ-HIST-001.
/// </summary>
public class HistoricalTelemetryRecordConfiguration : IEntityTypeConfiguration<HistoricalTelemetryRecord>
{
    public void Configure(EntityTypeBuilder<HistoricalTelemetryRecord> builder)
    {
        builder.HasKey(x => x.RecordId);
        builder.Property(x => x.Source).IsRequired().HasMaxLength(200);
        builder.Property(x => x.MetricName).IsRequired().HasMaxLength(200);
        builder.Property(x => x.Value).IsRequired();

        // Index-optimized queries per REQ-HIST-001
        builder.HasIndex(x => new { x.Source, x.Timestamp });
        builder.HasIndex(x => new { x.MetricName, x.Timestamp });
        builder.HasIndex(x => x.Timestamp);
    }
}