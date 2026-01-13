import { Injectable, ComponentRef, Type } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ModalConfig {
  id: string;
  data?: unknown;
}

export interface ModalState {
  activeModals: string[];
  modalData: Map<string, unknown>;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private stateSubject = new BehaviorSubject<ModalState>({
    activeModals: [],
    modalData: new Map(),
  });

  readonly state$: Observable<ModalState> = this.stateSubject.asObservable();

  // Track MatDialog references by modal ID
  private dialogRefs = new Map<string, MatDialogRef<any>>();
  // Track component types registered by modal ID
  private componentRegistry = new Map<string, Type<any>>();

  constructor(private dialog: MatDialog) {}

  get activeModals(): string[] {
    return this.stateSubject.value.activeModals;
  }

  isOpen(modalId: string): boolean {
    return this.stateSubject.value.activeModals.includes(modalId);
  }

  /**
   * Register a component to be used for a specific modal ID
   * This should be called during app initialization
   */
  registerComponent(modalId: string, component: Type<any>): void {
    this.componentRegistry.set(modalId, component);
  }

  open(config: ModalConfig | string): void {
    const modalConfig = typeof config === 'string' ? { id: config } : config;
    const currentState = this.stateSubject.value;

    if (currentState.activeModals.includes(modalConfig.id)) {
      return;
    }

    const newModalData = new Map(currentState.modalData);
    if (modalConfig.data !== undefined) {
      newModalData.set(modalConfig.id, modalConfig.data);
    }

    this.stateSubject.next({
      activeModals: [...currentState.activeModals, modalConfig.id],
      modalData: newModalData,
    });

    // Open MatDialog if component is registered
    const component = this.componentRegistry.get(modalConfig.id);
    if (component) {
      const dialogRef = this.dialog.open(component, {
        data: modalConfig.data,
        disableClose: false,
        panelClass: 'em-dialog',
      });

      this.dialogRefs.set(modalConfig.id, dialogRef);

      // Handle dialog close
      dialogRef.afterClosed().subscribe(() => {
        this.close(modalConfig.id);
      });
    }
  }

  close(modalId: string): void {
    const currentState = this.stateSubject.value;
    const newModalData = new Map(currentState.modalData);
    newModalData.delete(modalId);

    this.stateSubject.next({
      activeModals: currentState.activeModals.filter((id) => id !== modalId),
      modalData: newModalData,
    });

    // Close MatDialog if it exists
    const dialogRef = this.dialogRefs.get(modalId);
    if (dialogRef) {
      dialogRef.close();
      this.dialogRefs.delete(modalId);
    }
  }

  closeAll(): void {
    this.stateSubject.next({
      activeModals: [],
      modalData: new Map(),
    });

    // Close all MatDialogs
    this.dialog.closeAll();
    this.dialogRefs.clear();
  }

  getData<T>(modalId: string): T | undefined {
    return this.stateSubject.value.modalData.get(modalId) as T | undefined;
  }

  setData<T>(modalId: string, data: T): void {
    const currentState = this.stateSubject.value;
    const newModalData = new Map(currentState.modalData);
    newModalData.set(modalId, data);

    this.stateSubject.next({
      ...currentState,
      modalData: newModalData,
    });
  }

  isOpen$(modalId: string): Observable<boolean> {
    return new Observable((observer) => {
      return this.state$.subscribe((state) => {
        observer.next(state.activeModals.includes(modalId));
      });
    });
  }
}
