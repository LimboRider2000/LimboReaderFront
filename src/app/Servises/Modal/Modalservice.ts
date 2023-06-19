import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
  private openModalSubject = new Subject<void>();
  private closeModelSubject = new Subject<void>();

  openModal$ = this.openModalSubject.asObservable();
  closeModal$ = this.closeModelSubject.asObservable();
  openModal() {
    this.openModalSubject.next();
  }
  closeModal(){
    this.closeModelSubject.next();
  }
}
