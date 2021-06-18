import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostRequirmentComponent } from '../post-requirment/post-requirment.component';
import { BuyerHomeFilterComponent } from './buyer-home-filter/buyer-home-filter.component';

@Component({
  selector: 'app-buyer-home',
  templateUrl: './buyer-home.component.html',
  styleUrls: ['./buyer-home.component.scss']
})
export class BuyerHomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog() {
   this.dialog.open(BuyerHomeFilterComponent,{
    width: '60%',
    height: '90vh',
   });

  }
  openRequirmentDailoge(){
    this.dialog.open(PostRequirmentComponent,{
     });
  }
}
