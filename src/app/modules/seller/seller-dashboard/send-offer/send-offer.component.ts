import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-send-offer',
  templateUrl: './send-offer.component.html',
  styleUrls: ['./send-offer.component.scss']
})
export class SendOfferComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<SendOfferComponent>,) { }

  ngOnInit() {
  }
  onClose() {
    this.dialogRef.close();
}
}
