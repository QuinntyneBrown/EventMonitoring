import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalService, ModalConfig } from './modal.service';
import { of } from 'rxjs';

describe('ModalService', () => {
  let service: ModalService;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']);
    mockDialogRef.afterClosed.and.returnValue(of(undefined));
    
    mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
    mockDialog.open.and.returnValue(mockDialogRef);

    TestBed.configureTestingModule({
      providers: [
        ModalService,
        { provide: MatDialog, useValue: mockDialog },
      ],
    });
    service = TestBed.inject(ModalService);
  });

  describe('initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should start with no active modals', () => {
      expect(service.activeModals).toEqual([]);
    });
  });

  describe('open', () => {
    it('should open modal with string id', () => {
      service.open('test-modal');

      expect(service.isOpen('test-modal')).toBe(true);
    });

    it('should open modal with config object', () => {
      const config: ModalConfig = { id: 'test-modal', data: { foo: 'bar' } };
      service.open(config);

      expect(service.isOpen('test-modal')).toBe(true);
    });

    it('should store modal data', () => {
      const data = { foo: 'bar' };
      service.open({ id: 'test-modal', data });

      expect(service.getData('test-modal')).toEqual(data);
    });

    it('should not open same modal twice', () => {
      service.open('test-modal');
      service.open('test-modal');

      expect(service.activeModals.length).toBe(1);
    });

    it('should support multiple open modals', () => {
      service.open('modal-1');
      service.open('modal-2');

      expect(service.activeModals).toContain('modal-1');
      expect(service.activeModals).toContain('modal-2');
    });
  });

  describe('close', () => {
    it('should close open modal', () => {
      service.open('test-modal');
      service.close('test-modal');

      expect(service.isOpen('test-modal')).toBe(false);
    });

    it('should remove modal data on close', () => {
      service.open({ id: 'test-modal', data: { foo: 'bar' } });
      service.close('test-modal');

      expect(service.getData('test-modal')).toBeUndefined();
    });

    it('should handle closing non-existent modal', () => {
      expect(() => service.close('non-existent')).not.toThrow();
    });

    it('should keep other modals open', () => {
      service.open('modal-1');
      service.open('modal-2');
      service.close('modal-1');

      expect(service.isOpen('modal-1')).toBe(false);
      expect(service.isOpen('modal-2')).toBe(true);
    });
  });

  describe('closeAll', () => {
    it('should close all modals', () => {
      service.open('modal-1');
      service.open('modal-2');
      service.open('modal-3');
      service.closeAll();

      expect(service.activeModals).toEqual([]);
    });

    it('should clear all modal data', () => {
      service.open({ id: 'modal-1', data: { foo: 1 } });
      service.open({ id: 'modal-2', data: { foo: 2 } });
      service.closeAll();

      expect(service.getData('modal-1')).toBeUndefined();
      expect(service.getData('modal-2')).toBeUndefined();
    });
  });

  describe('getData', () => {
    it('should return undefined for non-existent modal', () => {
      expect(service.getData('non-existent')).toBeUndefined();
    });

    it('should return typed data', () => {
      interface TestData {
        name: string;
        value: number;
      }
      const data: TestData = { name: 'test', value: 42 };
      service.open({ id: 'test-modal', data });

      const result = service.getData<TestData>('test-modal');

      expect(result?.name).toBe('test');
      expect(result?.value).toBe(42);
    });
  });

  describe('setData', () => {
    it('should update modal data', () => {
      service.open({ id: 'test-modal', data: { initial: true } });
      service.setData('test-modal', { updated: true });

      expect(service.getData('test-modal')).toEqual({ updated: true });
    });

    it('should set data for modal without initial data', () => {
      service.open('test-modal');
      service.setData('test-modal', { newData: true });

      expect(service.getData('test-modal')).toEqual({ newData: true });
    });
  });

  describe('isOpen', () => {
    it('should return true for open modal', () => {
      service.open('test-modal');

      expect(service.isOpen('test-modal')).toBe(true);
    });

    it('should return false for closed modal', () => {
      expect(service.isOpen('test-modal')).toBe(false);
    });
  });

  describe('observables', () => {
    it('should emit state changes', async () => {
      const states: string[][] = [];

      return new Promise<void>((resolve) => {
        service.state$.subscribe((state) => {
          states.push([...state.activeModals]);
          if (states.length === 3) {
            expect(states[0]).toEqual([]);
            expect(states[1]).toEqual(['modal-1']);
            expect(states[2]).toEqual(['modal-1', 'modal-2']);
            resolve();
          }
        });

        service.open('modal-1');
        service.open('modal-2');
      });
    });

    it('should emit isOpen$ changes', async () => {
      const openStates: boolean[] = [];

      return new Promise<void>((resolve) => {
        service.isOpen$('test-modal').subscribe((isOpen) => {
          openStates.push(isOpen);
          if (openStates.length === 3) {
            expect(openStates).toEqual([false, true, false]);
            resolve();
          }
        });

        service.open('test-modal');
        service.close('test-modal');
      });
    });
  });
});
