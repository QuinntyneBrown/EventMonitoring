// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace EventMonitoring.TelemetryStreaming.Core.Entities;

/// <summary>
/// 50 types of telemetry messages representing various space vehicle components per REQ-STREAM-006.
/// </summary>
public static class SpaceVehicleTelemetryTypes
{
    public static readonly string[] AllTypes = new[]
    {
        // Propulsion System (1-8)
        "PropulsionMainEngineThrust",
        "PropulsionMainEngineTemperature",
        "PropulsionFuelPressure",
        "PropulsionOxidizerPressure",
        "PropulsionCombustionChamberTemp",
        "PropulsionNozzleTemperature",
        "PropulsionTurboPumpSpeed",
        "PropulsionFuelFlowRate",

        // Electrical Power System (9-16)
        "PowerSolarPanelVoltage",
        "PowerSolarPanelCurrent",
        "PowerBatteryVoltage",
        "PowerBatteryTemperature",
        "PowerBatteryStateOfCharge",
        "PowerBusVoltage",
        "PowerLoadCurrent",
        "PowerGenerationWatts",

        // Thermal Control System (17-24)
        "ThermalRadiatorTemperature",
        "ThermalHeatPipeStatus",
        "ThermalHeaterPower",
        "ThermalCoolantFlowRate",
        "ThermalMLITemperature",
        "ThermalLouverPosition",
        "ThermalHeatExchangerDelta",
        "ThermalCryoCoolerTemp",

        // Attitude Control System (25-32)
        "AttitudeRollAngle",
        "AttitudePitchAngle",
        "AttitudeYawAngle",
        "AttitudeRollRate",
        "AttitudePitchRate",
        "AttitudeYawRate",
        "AttitudeReactionWheelSpeed",
        "AttitudeThrusterFiring",

        // Navigation & Guidance (33-40)
        "NavPositionX",
        "NavPositionY",
        "NavPositionZ",
        "NavVelocityX",
        "NavVelocityY",
        "NavVelocityZ",
        "NavAltitude",
        "NavGroundSpeed",

        // Communications (41-46)
        "CommSignalStrength",
        "CommBitErrorRate",
        "CommAntennaPointing",
        "CommDataRate",
        "CommTransmitterPower",
        "CommReceiverSensitivity",

        // Life Support (for crewed vehicles) (47-50)
        "LifeSupportOxygenLevel",
        "LifeSupportCO2Level",
        "LifeSupportCabinPressure",
        "LifeSupportCabinTemperature"
    };

    public static int Count => AllTypes.Length;
}