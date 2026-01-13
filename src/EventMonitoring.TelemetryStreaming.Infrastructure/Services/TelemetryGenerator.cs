// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using EventMonitoring.TelemetryStreaming.Core.Entities;
using EventMonitoring.TelemetryStreaming.Core.Interfaces;

namespace EventMonitoring.TelemetryStreaming.Infrastructure.Services;

public class TelemetryGenerator : ITelemetryGenerator
{
    private readonly Random random = new();
    private readonly Dictionary<string, Func<string>> valueGenerators;

    public TelemetryGenerator()
    {
        valueGenerators = new Dictionary<string, Func<string>>
        {
            // Propulsion
            { "PropulsionMainEngineThrust", () => (random.NextDouble() * 1000000 + 500000).ToString("F2") },
            { "PropulsionMainEngineTemperature", () => (random.NextDouble() * 500 + 2500).ToString("F1") },
            { "PropulsionFuelPressure", () => (random.NextDouble() * 50 + 200).ToString("F2") },
            { "PropulsionOxidizerPressure", () => (random.NextDouble() * 50 + 200).ToString("F2") },
            { "PropulsionCombustionChamberTemp", () => (random.NextDouble() * 200 + 3000).ToString("F1") },
            { "PropulsionNozzleTemperature", () => (random.NextDouble() * 300 + 1500).ToString("F1") },
            { "PropulsionTurboPumpSpeed", () => (random.NextDouble() * 5000 + 30000).ToString("F0") },
            { "PropulsionFuelFlowRate", () => (random.NextDouble() * 100 + 200).ToString("F2") },

            // Power
            { "PowerSolarPanelVoltage", () => (random.NextDouble() * 5 + 28).ToString("F2") },
            { "PowerSolarPanelCurrent", () => (random.NextDouble() * 10 + 15).ToString("F2") },
            { "PowerBatteryVoltage", () => (random.NextDouble() * 2 + 26).ToString("F2") },
            { "PowerBatteryTemperature", () => (random.NextDouble() * 20 + 15).ToString("F1") },
            { "PowerBatteryStateOfCharge", () => (random.NextDouble() * 30 + 70).ToString("F1") },
            { "PowerBusVoltage", () => (random.NextDouble() * 0.5 + 28).ToString("F2") },
            { "PowerLoadCurrent", () => (random.NextDouble() * 5 + 10).ToString("F2") },
            { "PowerGenerationWatts", () => (random.NextDouble() * 500 + 2000).ToString("F1") },

            // Thermal
            { "ThermalRadiatorTemperature", () => (random.NextDouble() * 50 - 20).ToString("F1") },
            { "ThermalHeatPipeStatus", () => random.Next(0, 2).ToString() },
            { "ThermalHeaterPower", () => (random.NextDouble() * 100).ToString("F1") },
            { "ThermalCoolantFlowRate", () => (random.NextDouble() * 2 + 1).ToString("F2") },
            { "ThermalMLITemperature", () => (random.NextDouble() * 100 - 150).ToString("F1") },
            { "ThermalLouverPosition", () => (random.NextDouble() * 100).ToString("F1") },
            { "ThermalHeatExchangerDelta", () => (random.NextDouble() * 10 + 5).ToString("F2") },
            { "ThermalCryoCoolerTemp", () => (random.NextDouble() * 5 - 270).ToString("F2") },

            // Attitude
            { "AttitudeRollAngle", () => (random.NextDouble() * 360 - 180).ToString("F3") },
            { "AttitudePitchAngle", () => (random.NextDouble() * 180 - 90).ToString("F3") },
            { "AttitudeYawAngle", () => (random.NextDouble() * 360 - 180).ToString("F3") },
            { "AttitudeRollRate", () => (random.NextDouble() * 2 - 1).ToString("F4") },
            { "AttitudePitchRate", () => (random.NextDouble() * 2 - 1).ToString("F4") },
            { "AttitudeYawRate", () => (random.NextDouble() * 2 - 1).ToString("F4") },
            { "AttitudeReactionWheelSpeed", () => (random.NextDouble() * 6000 - 3000).ToString("F1") },
            { "AttitudeThrusterFiring", () => random.Next(0, 2).ToString() },

            // Navigation
            { "NavPositionX", () => (random.NextDouble() * 1000000 - 500000).ToString("F2") },
            { "NavPositionY", () => (random.NextDouble() * 1000000 - 500000).ToString("F2") },
            { "NavPositionZ", () => (random.NextDouble() * 1000000 - 500000).ToString("F2") },
            { "NavVelocityX", () => (random.NextDouble() * 100 - 50).ToString("F4") },
            { "NavVelocityY", () => (random.NextDouble() * 100 - 50).ToString("F4") },
            { "NavVelocityZ", () => (random.NextDouble() * 100 - 50).ToString("F4") },
            { "NavAltitude", () => (random.NextDouble() * 100000 + 300000).ToString("F2") },
            { "NavGroundSpeed", () => (random.NextDouble() * 1000 + 7000).ToString("F2") },

            // Communications
            { "CommSignalStrength", () => (random.NextDouble() * 30 - 100).ToString("F1") },
            { "CommBitErrorRate", () => (random.NextDouble() * 0.001).ToString("E3") },
            { "CommAntennaPointing", () => (random.NextDouble() * 2).ToString("F3") },
            { "CommDataRate", () => (random.NextDouble() * 100 + 50).ToString("F1") },
            { "CommTransmitterPower", () => (random.NextDouble() * 10 + 20).ToString("F1") },
            { "CommReceiverSensitivity", () => (random.NextDouble() * 10 - 130).ToString("F1") },

            // Life Support
            { "LifeSupportOxygenLevel", () => (random.NextDouble() * 2 + 20).ToString("F2") },
            { "LifeSupportCO2Level", () => (random.NextDouble() * 0.5 + 0.3).ToString("F3") },
            { "LifeSupportCabinPressure", () => (random.NextDouble() * 2 + 100).ToString("F2") },
            { "LifeSupportCabinTemperature", () => (random.NextDouble() * 5 + 20).ToString("F1") }
        };
    }

    public TelemetryMessage Generate(string name)
    {
        var value = valueGenerators.TryGetValue(name, out var generator)
            ? generator()
            : random.NextDouble().ToString("F4");

        return new TelemetryMessage
        {
            TelemetryMessageId = Guid.NewGuid(),
            Name = name,
            Ust = DateTime.UtcNow,
            Value = value
        };
    }

    public IEnumerable<TelemetryMessage> GenerateBatch(IEnumerable<string> names)
    {
        return names.Select(Generate).ToList();
    }

    public IEnumerable<TelemetryMessage> GenerateAll()
    {
        return GenerateBatch(SpaceVehicleTelemetryTypes.AllTypes);
    }
}