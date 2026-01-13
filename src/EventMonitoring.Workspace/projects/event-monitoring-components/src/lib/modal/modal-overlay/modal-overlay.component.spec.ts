import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ModalOverlayComponent } from './modal-overlay.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [ModalOverlayComponent],
  template: `
    <em-modal-overlay [isOpen]="isOpen" title="Test Modal">
      <div class="test-content">Modal Content</div>
      <div modal-footer class="test-footer">Footer Content</div>
    </em-modal-overlay>
  `,
})
class TestHostComponent {
  isOpen = true;
}

describe('ModalOverlayComponent', () => {
  let component: ModalOverlayComponent;
  let fixture: ComponentFixture<ModalOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOverlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not render when isOpen is false', () => {
      component.isOpen = false;
      fixture.detectChanges();

      const overlay = fixture.nativeElement.querySelector('.modal-overlay');
      expect(overlay).toBeNull();
    });

    it('should render when isOpen is true', () => {
      component.isOpen = true;
      fixture.detectChanges();

      const overlay = fixture.nativeElement.querySelector('.modal-overlay');
      expect(overlay).toBeTruthy();
    });

    it('should display title', () => {
      component.isOpen = true;
      component.title = 'Test Title';
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('.modal__title');
      expect(title.textContent).toContain('Test Title');
    });

    it('should display icon when provided', () => {
      component.isOpen = true;
      component.icon = 'folder_open';
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.modal__title-icon');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toContain('folder_open');
    });

    it('should not display icon when not provided', () => {
      component.isOpen = true;
      component.icon = '';
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.modal__title-icon');
      expect(icon).toBeNull();
    });
  });

  describe('sizes', () => {
    beforeEach(() => {
      component.isOpen = true;
    });

    it('should apply small size class', () => {
      component.size = 'small';
      fixture.detectChanges();

      const modal = fixture.nativeElement.querySelector('.modal');
      expect(modal.classList.contains('modal--small')).toBe(true);
    });

    it('should apply medium size class', () => {
      component.size = 'medium';
      fixture.detectChanges();

      const modal = fixture.nativeElement.querySelector('.modal');
      expect(modal.classList.contains('modal--medium')).toBe(true);
    });

    it('should apply large size class', () => {
      component.size = 'large';
      fixture.detectChanges();

      const modal = fixture.nativeElement.querySelector('.modal');
      expect(modal.classList.contains('modal--large')).toBe(true);
    });
  });

  describe('icon colors', () => {
    beforeEach(() => {
      component.isOpen = true;
      component.icon = 'test';
    });

    it('should apply primary color class', () => {
      component.iconColor = 'primary';
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.modal__title-icon');
      expect(icon.classList.contains('modal__title-icon--primary')).toBe(true);
    });

    it('should apply secondary color class', () => {
      component.iconColor = 'secondary';
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.modal__title-icon');
      expect(icon.classList.contains('modal__title-icon--secondary')).toBe(true);
    });
  });

  describe('footer', () => {
    beforeEach(() => {
      component.isOpen = true;
    });

    it('should show footer by default', () => {
      fixture.detectChanges();

      const footer = fixture.nativeElement.querySelector('.modal__footer');
      expect(footer).toBeTruthy();
    });

    it('should hide footer when showFooter is false', () => {
      component.showFooter = false;
      fixture.detectChanges();

      const footer = fixture.nativeElement.querySelector('.modal__footer');
      expect(footer).toBeNull();
    });
  });

  describe('events', () => {
    beforeEach(() => {
      component.isOpen = true;
      fixture.detectChanges();
    });

    it('should emit closed when close button is clicked', () => {
      const closedSpy = vi.fn();
      component.closed.subscribe(closedSpy);

      const closeBtn = fixture.nativeElement.querySelector('.modal__close-btn');
      closeBtn.click();

      expect(closedSpy).toHaveBeenCalled();
    });

    it('should emit closed when backdrop is clicked and closeOnBackdrop is true', () => {
      component.closeOnBackdrop = true;
      fixture.detectChanges();

      const closedSpy = vi.fn();
      component.closed.subscribe(closedSpy);

      const overlay = fixture.nativeElement.querySelector('.modal-overlay');
      overlay.click();

      expect(closedSpy).toHaveBeenCalled();
    });

    it('should not emit closed when backdrop is clicked and closeOnBackdrop is false', () => {
      component.closeOnBackdrop = false;
      fixture.detectChanges();

      const closedSpy = vi.fn();
      component.closed.subscribe(closedSpy);

      const overlay = fixture.nativeElement.querySelector('.modal-overlay');
      overlay.click();

      expect(closedSpy).not.toHaveBeenCalled();
    });

    it('should not emit closed when modal content is clicked', () => {
      const closedSpy = vi.fn();
      component.closed.subscribe(closedSpy);

      const modal = fixture.nativeElement.querySelector('.modal');
      modal.click();

      expect(closedSpy).not.toHaveBeenCalled();
    });

    it('should close on escape key when open', () => {
      const closedSpy = vi.fn();
      component.closed.subscribe(closedSpy);

      component.onEscapeKey();

      expect(closedSpy).toHaveBeenCalled();
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

    it('should project main content', () => {
      const content = hostFixture.nativeElement.querySelector('.test-content');
      expect(content).toBeTruthy();
      expect(content.textContent).toBe('Modal Content');
    });

    it('should project footer content', () => {
      const footer = hostFixture.nativeElement.querySelector('.test-footer');
      expect(footer).toBeTruthy();
      expect(footer.textContent).toBe('Footer Content');
    });
  });
});
