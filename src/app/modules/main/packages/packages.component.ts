import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubscriptionInformationComponent } from '../subscription-information/subscription-information.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  constructor( public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog() {
    this.dialog.open(SubscriptionInformationComponent,{
      width: '90%',
      panelClass: 'custom-dialog'
    });
 
   }
}
