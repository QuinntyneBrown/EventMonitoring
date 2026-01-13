import { Injectable } from '@angular/core';
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

  get activeModals(): string[] {
    return this.stateSubject.value.activeModals;
  }

  isOpen(modalId: string): boolean {
    return this.stateSubject.value.activeModals.includes(modalId);
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
  }

  close(modalId: string): void {
    const currentState = this.stateSubject.value;
    const newModalData = new Map(currentState.modalData);
    newModalData.delete(modalId);

    this.stateSubject.next({
      activeModals: currentState.activeModals.filter((id) => id !== modalId),
      modalData: newModalData,
    });
  }

  closeAll(): void {
    this.stateSubject.next({
      activeModals: [],
      modalData: new Map(),
    });
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
