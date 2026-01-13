import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMonitoringComponents } from './event-monitoring-components';

describe('EventMonitoringComponents', () => {
  let component: EventMonitoringComponents;
  let fixture: ComponentFixture<EventMonitoringComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventMonitoringComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventMonitoringComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
