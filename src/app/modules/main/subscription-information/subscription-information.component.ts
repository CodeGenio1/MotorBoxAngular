import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-subscription-information',
  templateUrl: './subscription-information.component.html',
  styleUrls: ['./subscription-information.component.scss']
})
export class SubscriptionInformationComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SubscriptionInformationComponent>,) { }

  ngOnInit() {
  }
  onClose() {
    this.dialogRef.close();
}
}
