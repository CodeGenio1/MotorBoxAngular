import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'my-alert-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dailogue.component.scss']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>) { }
  cancel() {
    this.dialogRef.close('a');
  }
  delete(confirm) {
    this.dialogRef.close(confirm);
  }
}
