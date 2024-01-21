import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private modalService: NgbModal) {}

  showAlert(title: string, message: string): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
  }
}
