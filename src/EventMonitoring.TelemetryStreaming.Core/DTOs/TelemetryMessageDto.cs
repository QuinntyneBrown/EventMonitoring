// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace EventMonitoring.TelemetryStreaming.Core.DTOs;

/// <summary>
/// DTO for telemetry message with Name, Ust, Value per REQ-STREAM-008.
/// </summary>
public class TelemetryMessageDto
{
    public required string Name { get; set; }
    public DateTime Ust { get; set; }
    public required string Value { get; set; }
}