// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using EventMonitoring.HistoricalTelemetry.Core.Entities;

namespace EventMonitoring.HistoricalTelemetry.Core.Interfaces;

public interface ITelemetryPersistenceService
{
    Task PersistTelemetryAsync(HistoricalTelemetryRecord record, CancellationToken cancellationToken = default);
    Task PersistBatchAsync(IEnumerable<HistoricalTelemetryRecord> records, CancellationToken cancellationToken = default);
}