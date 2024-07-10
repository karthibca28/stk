import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  display: boolean = false;
  @Output() confirmed = new EventEmitter<boolean>();

  constructor(){}

  ngOnInit(): void {
  }

  confirmDelete() {
    this.confirmed.emit(true);
  }

  cancelDelete() {
    this.confirmed.emit(false);
  }

}
