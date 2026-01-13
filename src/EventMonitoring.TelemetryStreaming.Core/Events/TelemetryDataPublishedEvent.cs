// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace EventMonitoring.TelemetryStreaming.Core.Events;

public record TelemetryDataPublishedEvent(string Name, string Value, DateTime Ust);