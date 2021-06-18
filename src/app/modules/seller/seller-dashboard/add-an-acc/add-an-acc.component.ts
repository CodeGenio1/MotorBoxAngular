import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-an-acc',
  templateUrl: './add-an-acc.component.html',
  styleUrls: ['./add-an-acc.component.scss']
})
export class AddAnAccComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddAnAccComponent>,) { }

  ngOnInit() {
  }
  onClose() {
    this.dialogRef.close();
}
}
