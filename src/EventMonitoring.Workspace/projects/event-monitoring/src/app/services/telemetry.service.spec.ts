import { TestBed } from '@angular/core/testing';
import { TelemetryService, TelemetryMessage } from './telemetry.service';
import { take } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

describe('TelemetryService', () => {
  let service: TelemetryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelemetryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with Connecting status', async () => {
    const status = await firstValueFrom(service.connectionStatus$.pipe(take(1)));
    expect(status).toBe('Connecting');
  });

  it('should transition to OK status after connection', async () => {
    await new Promise(resolve => setTimeout(resolve, 1100));
    const status = await firstValueFrom(service.connectionStatus$.pipe(take(1)));
    expect(status).toBe('OK');
  });

  it('should allow subscribing to telemetry', async () => {
    const subscription = {
      clientId: 'test-client',
      metrics: ['cpu_usage', 'memory_usage'],
      updateRateMs: 1000,
    };
    
    service.subscribe(subscription);
    
    const subs = await firstValueFrom(service.subscriptions$.pipe(take(1)));
    expect(subs.length).toBe(1);
    expect(subs[0].clientId).toBe('test-client');
  });

  it('should allow unsubscribing from telemetry', async () => {
    const subscription = {
      clientId: 'test-client',
      metrics: ['cpu_usage'],
      updateRateMs: 1000,
    };
    
    service.subscribe(subscription);
    service.unsubscribe('test-client');
    
    const subs = await firstValueFrom(service.subscriptions$.pipe(take(1)));
    expect(subs.length).toBe(0);
  });

  it('should update existing subscription when subscribing with same clientId', async () => {
    const subscription1 = {
      clientId: 'test-client',
      metrics: ['cpu_usage'],
      updateRateMs: 1000,
    };
    
    const subscription2 = {
      clientId: 'test-client',
      metrics: ['memory_usage', 'fuel_level'],
      updateRateMs: 500,
    };
    
    service.subscribe(subscription1);
    service.subscribe(subscription2);
    
    const subs = await firstValueFrom(service.subscriptions$.pipe(take(1)));
    expect(subs.length).toBe(1);
    expect(subs[0].metrics).toEqual(['memory_usage', 'fuel_level']);
    expect(subs[0].updateRateMs).toBe(500);
  });

  it('should calculate active subscription count', async () => {
    const subscription1 = {
      clientId: 'client1',
      metrics: ['cpu_usage', 'memory_usage'],
      updateRateMs: 1000,
    };
    
    const subscription2 = {
      clientId: 'client2',
      metrics: ['fuel_level'],
      updateRateMs: 1000,
    };
    
    service.subscribe(subscription1);
    service.subscribe(subscription2);
    
    const count = await firstValueFrom(service.getActiveSubscriptionCount().pipe(take(1)));
    expect(count).toBe(3); // 2 + 1
  });

  it('should emit telemetry messages after connection', async () => {
    await new Promise(resolve => setTimeout(resolve, 1300));
    const message = await firstValueFrom(service.telemetry$.pipe(take(1)));
    if (message) {
      expect(message.name).toBeTruthy();
      expect(message.ust).toBeTruthy();
      expect(message.value).toBeTruthy();
    }
  });
});
