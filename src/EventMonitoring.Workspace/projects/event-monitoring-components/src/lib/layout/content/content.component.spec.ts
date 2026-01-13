import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentComponent } from './content.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [ContentComponent],
  template: `<em-content><div class="test-content">Test Content</div></em-content>`,
})
class TestHostComponent {}

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have content class on main element', () => {
      const mainElement = fixture.nativeElement.querySelector('.content');
      expect(mainElement).toBeTruthy();
    });

    it('should be a main element', () => {
      const mainElement = fixture.nativeElement.querySelector('main');
      expect(mainElement).toBeTruthy();
    });
  });

  describe('content projection', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
      }).compileComponents();

      hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();
    });

    it('should project content', () => {
      const projectedContent = hostFixture.nativeElement.querySelector('.test-content');
      expect(projectedContent).toBeTruthy();
      expect(projectedContent.textContent).toBe('Test Content');
    });
  });
});
