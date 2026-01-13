import { TestBed } from '@angular/core/testing';
import { ConfigurationService, ConfigurationFile } from './configuration.service';
import { take } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

describe('ConfigurationService', () => {
  let service: ConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load 10 mock configuration files', async () => {
    const files = await firstValueFrom(service.getAll());
    expect(files.length).toBe(10);
  });

  it('should have Spacecraft Sensors configuration', async () => {
    const files = await firstValueFrom(service.getAll());
    const spacecraftSensors = files.find(f => f.name === 'Spacecraft Sensors');
    expect(spacecraftSensors).toBeTruthy();
    expect(spacecraftSensors?.items.length).toBeGreaterThan(0);
  });

  it('should get configuration by ID', async () => {
    const file = await firstValueFrom(service.getById('1'));
    expect(file).toBeTruthy();
    expect(file?.name).toBe('Spacecraft Sensors');
  });

  it('should get configuration by path', async () => {
    const file = await firstValueFrom(service.getByPath('/telemetry/navigation-systems.json'));
    expect(file).toBeTruthy();
    expect(file?.name).toBe('Navigation Systems');
  });

  it('should return undefined for non-existent ID', async () => {
    const file = await firstValueFrom(service.getById('non-existent'));
    expect(file).toBeUndefined();
  });

  it('should return undefined for non-existent path', async () => {
    const file = await firstValueFrom(service.getByPath('/non/existent/path.json'));
    expect(file).toBeUndefined();
  });

  it('should have configuration items with proper types', async () => {
    const file = await firstValueFrom(service.getById('1'));
    expect(file?.items).toBeTruthy();
    const firstItem = file?.items[0];
    expect(firstItem?.key).toBeTruthy();
    expect(firstItem?.value).toBeTruthy();
    expect(firstItem?.type).toBeTruthy();
  });

  it('should have lastModified timestamp for each file', async () => {
    const files = await firstValueFrom(service.getAll());
    files.forEach(file => {
      expect(file.lastModified).toBeTruthy();
      expect(new Date(file.lastModified).getTime()).not.toBeNaN();
    });
  });

  it('should have unique IDs for each configuration file', async () => {
    const files = await firstValueFrom(service.getAll());
    const ids = files.map(f => f.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(files.length);
  });

  it('should have descriptions for configuration files', async () => {
    const files = await firstValueFrom(service.getAll());
    files.forEach(file => {
      expect(file.description).toBeTruthy();
    });
  });
});
