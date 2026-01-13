// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using EventMonitoring.TelemetryStreaming.Core.Entities;

namespace EventMonitoring.TelemetryStreaming.Core.Interfaces;

public interface ITelemetryGenerator
{
    TelemetryMessage Generate(string name);
    IEnumerable<TelemetryMessage> GenerateBatch(IEnumerable<string> names);
    IEnumerable<TelemetryMessage> GenerateAll();
}