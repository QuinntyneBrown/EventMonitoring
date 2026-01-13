import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with live mode', () => {
    expect(component.mode).toBe('live');
  });

  it('should initialize with edit mode inactive', () => {
    expect(component.editModeActive).toBe(false);
  });

  it('should toggle edit mode', () => {
    const initialState = component.editModeActive;
    component.onEditToggle();
    expect(component.editModeActive).toBe(!initialState);
  });

  it('should have dashboard as active nav item', () => {
    expect(component.activeNavItemId).toBe('dashboard');
  });

  it('should update active nav item on click', () => {
    const testItem = { id: 'telemetry', label: 'Telemetry', icon: 'show_chart' };
    component.onNavItemClick(testItem);
    expect(component.activeNavItemId).toBe('telemetry');
  });

  it('should have three sidenav sections', () => {
    expect(component.sidenavSections.length).toBe(3);
  });

  it('should have Main section with correct items', () => {
    const mainSection = component.sidenavSections[0];
    expect(mainSection.title).toBe('Main');
    expect(mainSection.items.length).toBe(3);
  });

  it('should have Configuration section', () => {
    const configSection = component.sidenavSections[1];
    expect(configSection.title).toBe('Configuration');
  });

  it('should have System section', () => {
    const systemSection = component.sidenavSections[2];
    expect(systemSection.title).toBe('System');
  });
});
