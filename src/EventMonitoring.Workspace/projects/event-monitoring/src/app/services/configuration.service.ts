import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ConfigurationFileItem {
  id: string;
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
}

export interface ConfigurationFile {
  id: string;
  path: string;
  name: string;
  description?: string;
  items: ConfigurationFileItem[];
  lastModified: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private readonly configFilesSubject = new BehaviorSubject<ConfigurationFile[]>([]);
  readonly configFiles$ = this.configFilesSubject.asObservable();

  constructor() {
    this.loadMockConfigFiles();
  }

  getAll(): Observable<ConfigurationFile[]> {
    return this.configFiles$;
  }

  getById(id: string): Observable<ConfigurationFile | undefined> {
    return of(this.configFilesSubject.value.find(f => f.id === id)).pipe(delay(100));
  }

  getByPath(path: string): Observable<ConfigurationFile | undefined> {
    return of(this.configFilesSubject.value.find(f => f.path === path)).pipe(delay(100));
  }

  private loadMockConfigFiles(): void {
    const mockFiles: ConfigurationFile[] = [
      {
        id: '1',
        path: '/telemetry/spacecraft-sensors.json',
        name: 'Spacecraft Sensors',
        description: 'Main spacecraft sensor configuration',
        lastModified: new Date(Date.now() - 86400000).toISOString(),
        items: [
          { id: '1-1', key: 'cpu_usage', value: 'true', type: 'boolean' },
          { id: '1-2', key: 'memory_usage', value: 'true', type: 'boolean' },
          { id: '1-3', key: 'fuel_level', value: 'true', type: 'boolean' },
          { id: '1-4', key: 'oxygen_level', value: 'true', type: 'boolean' },
        ],
      },
      {
        id: '2',
        path: '/telemetry/navigation-systems.json',
        name: 'Navigation Systems',
        description: 'Navigation and positioning sensors',
        lastModified: new Date(Date.now() - 172800000).toISOString(),
        items: [
          { id: '2-1', key: 'gps_lat', value: 'true', type: 'boolean' },
          { id: '2-2', key: 'gps_lon', value: 'true', type: 'boolean' },
          { id: '2-3', key: 'altitude', value: 'true', type: 'boolean' },
          { id: '2-4', key: 'velocity', value: 'true', type: 'boolean' },
        ],
      },
      {
        id: '3',
        path: '/telemetry/environmental-controls.json',
        name: 'Environmental Controls',
        description: 'Life support and environmental monitoring',
        lastModified: new Date(Date.now() - 259200000).toISOString(),
        items: [
          { id: '3-1', key: 'temperature', value: 'true', type: 'boolean' },
          { id: '3-2', key: 'pressure', value: 'true', type: 'boolean' },
          { id: '3-3', key: 'humidity', value: 'true', type: 'boolean' },
          { id: '3-4', key: 'air_quality', value: 'true', type: 'boolean' },
        ],
      },
      {
        id: '4',
        path: '/telemetry/power-systems.json',
        name: 'Power Systems',
        description: 'Power generation and consumption',
        lastModified: new Date(Date.now() - 345600000).toISOString(),
        items: [
          { id: '4-1', key: 'battery_voltage', value: 'true', type: 'boolean' },
          { id: '4-2', key: 'solar_panel_output', value: 'true', type: 'boolean' },
          { id: '4-3', key: 'power_consumption', value: 'true', type: 'boolean' },
          { id: '4-4', key: 'backup_power', value: 'true', type: 'boolean' },
        ],
      },
      {
        id: '5',
        path: '/telemetry/propulsion-systems.json',
        name: 'Propulsion Systems',
        description: 'Thruster and propulsion monitoring',
        lastModified: new Date(Date.now() - 432000000).toISOString(),
        items: [
          { id: '5-1', key: 'thruster_temp', value: 'true', type: 'boolean' },
          { id: '5-2', key: 'acceleration', value: 'true', type: 'boolean' },
        ],
      },
      {
        id: '6',
        path: '/telemetry/communication-systems.json',
        name: 'Communication Systems',
        description: 'Communication and antenna systems',
        lastModified: new Date(Date.now() - 518400000).toISOString(),
        items: [
          { id: '6-1', key: 'communication_signal', value: 'true', type: 'boolean' },
          { id: '6-2', key: 'antenna_position', value: 'true', type: 'boolean' },
        ],
      },
      {
        id: '7',
        path: '/telemetry/science-instruments.json',
        name: 'Science Instruments',
        description: 'Scientific measurement instruments',
        lastModified: new Date(Date.now() - 604800000).toISOString(),
        items: [
          { id: '7-1', key: 'radiation_level', value: 'true', type: 'boolean' },
          { id: '7-2', key: 'scan_results', value: 'true', type: 'boolean' },
        ],
      },
      {
        id: '8',
        path: '/telemetry/structural-monitoring.json',
        name: 'Structural Monitoring',
        description: 'Hull integrity and structural sensors',
        lastModified: new Date(Date.now() - 691200000).toISOString(),
        items: [
          { id: '8-1', key: 'hull_integrity', value: 'true', type: 'boolean' },
          { id: '8-2', key: 'vibration_level', value: 'true', type: 'boolean' },
        ],
      },
      {
        id: '9',
        path: '/telemetry/crew-systems.json',
        name: 'Crew Systems',
        description: 'Crew health and support systems',
        lastModified: new Date(Date.now() - 777600000).toISOString(),
        items: [
          { id: '9-1', key: 'life_support_status', value: 'true', type: 'boolean' },
          { id: '9-2', key: 'crew_count', value: '6', type: 'number' },
        ],
      },
      {
        id: '10',
        path: '/telemetry/mission-parameters.json',
        name: 'Mission Parameters',
        description: 'Mission timing and status',
        lastModified: new Date(Date.now() - 864000000).toISOString(),
        items: [
          { id: '10-1', key: 'system_time', value: 'true', type: 'boolean' },
          { id: '10-2', key: 'mission_elapsed_time', value: 'true', type: 'boolean' },
          { id: '10-3', key: 'distance_to_target', value: 'true', type: 'boolean' },
        ],
      },
    ];

    this.configFilesSubject.next(mockFiles);
  }
}
