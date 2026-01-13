import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TelemetryMessage {
  name: string;
  ust: string; // UTC timestamp
  value: string; // numeric, boolean, or enum value as string
}

export interface TelemetrySubscription {
  clientId: string;
  metrics: string[];
  sources?: string[];
  updateRateMs: number;
}

@Injectable({
  providedIn: 'root',
})
export class TelemetryService {
  private readonly telemetrySubject = new BehaviorSubject<TelemetryMessage | null>(null);
  private readonly connectionStatusSubject = new BehaviorSubject<'OK' | 'Error' | 'Connecting'>('Connecting');
  private readonly subscriptionsSubject = new BehaviorSubject<TelemetrySubscription[]>([]);
  
  readonly telemetry$ = this.telemetrySubject.asObservable();
  readonly connectionStatus$ = this.connectionStatusSubject.asObservable();
  readonly subscriptions$ = this.subscriptionsSubject.asObservable();

  private readonly telemetryTypes = [
    'cpu_usage', 'memory_usage', 'fuel_level', 'oxygen_level', 'temperature',
    'pressure', 'altitude', 'velocity', 'acceleration', 'battery_voltage',
    'solar_panel_output', 'thruster_temp', 'gyroscope_x', 'gyroscope_y', 'gyroscope_z',
    'magnetometer_x', 'magnetometer_y', 'magnetometer_z', 'gps_lat', 'gps_lon',
    'communication_signal', 'antenna_position', 'camera_status', 'sensor_health',
    'life_support_status', 'radiation_level', 'hull_integrity', 'navigation_mode',
    'autopilot_status', 'docking_status', 'cargo_weight', 'crew_count',
    'water_reserves', 'food_reserves', 'waste_level', 'air_quality',
    'co2_level', 'humidity', 'vibration_level', 'noise_level',
    'power_consumption', 'backup_power', 'emergency_systems', 'shield_status',
    'weapon_status', 'scan_results', 'proximity_alert', 'system_time',
    'mission_elapsed_time', 'distance_to_target'
  ];

  constructor() {
    // Simulate connection establishment
    setTimeout(() => {
      this.connectionStatusSubject.next('OK');
      this.startMockTelemetryGeneration();
    }, 1000);
  }

  subscribe(subscription: TelemetrySubscription): void {
    const subscriptions = this.subscriptionsSubject.value;
    const existingIndex = subscriptions.findIndex(s => s.clientId === subscription.clientId);
    
    if (existingIndex >= 0) {
      subscriptions[existingIndex] = subscription;
    } else {
      subscriptions.push(subscription);
    }
    
    this.subscriptionsSubject.next([...subscriptions]);
  }

  unsubscribe(clientId: string): void {
    const subscriptions = this.subscriptionsSubject.value.filter(s => s.clientId !== clientId);
    this.subscriptionsSubject.next(subscriptions);
  }

  getActiveSubscriptionCount(): Observable<number> {
    return this.subscriptions$.pipe(
      map(subs => subs.reduce((count, sub) => count + sub.metrics.length, 0))
    );
  }

  private startMockTelemetryGeneration(): void {
    // Generate telemetry at 5 Hz (200ms intervals)
    interval(200).subscribe(() => {
      const randomType = this.telemetryTypes[Math.floor(Math.random() * this.telemetryTypes.length)];
      const message: TelemetryMessage = {
        name: randomType,
        ust: new Date().toISOString(),
        value: this.generateMockValue(randomType),
      };
      
      this.telemetrySubject.next(message);
    });
  }

  private generateMockValue(type: string): string {
    // Generate realistic mock values based on telemetry type
    if (type.includes('status') || type.includes('mode')) {
      const statuses = ['OK', 'Warning', 'Error', 'Active', 'Inactive'];
      return statuses[Math.floor(Math.random() * statuses.length)];
    } else if (type.includes('level') || type.includes('usage')) {
      return (Math.random() * 100).toFixed(2);
    } else if (type.includes('temp')) {
      return (Math.random() * 50 + 20).toFixed(1);
    } else if (type.includes('count')) {
      return Math.floor(Math.random() * 10).toString();
    } else {
      return (Math.random() * 1000).toFixed(2);
    }
  }
}
