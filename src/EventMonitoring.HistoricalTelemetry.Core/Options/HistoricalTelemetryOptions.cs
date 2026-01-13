// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace EventMonitoring.HistoricalTelemetry.Core.Options;

/// <summary>
/// Options for HistoricalTelemetry service per REQ-HIST-006.
/// </summary>
public class HistoricalTelemetryOptions
{
    public const string SectionName = "HistoricalTelemetry";

    public string RedisConnectionString { get; set; } = "localhost:6379";
    public string TelemetryChannel { get; set; } = "telemetry";
    public int BatchSize { get; set; } = 100;
    public int BatchIntervalMs { get; set; } = 1000;
}