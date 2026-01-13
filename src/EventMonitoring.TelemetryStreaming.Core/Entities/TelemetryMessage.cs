// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace EventMonitoring.TelemetryStreaming.Core.Entities;

/// <summary>
/// Telemetry message with Name, Ust (UTC timestamp), and Value per REQ-STREAM-008.
/// </summary>
public class TelemetryMessage
{
    public Guid TelemetryMessageId { get; set; }

    /// <summary>
    /// Name of the telemetry metric (e.g., "PropulsionTemperature", "BatteryVoltage").
    /// </summary>
    public required string Name { get; set; }

    /// <summary>
    /// UTC timestamp when the telemetry was recorded.
    /// </summary>
    public DateTime Ust { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Value as string - can represent numeric, boolean, or enum values.
    /// </summary>
    public required string Value { get; set; }
}