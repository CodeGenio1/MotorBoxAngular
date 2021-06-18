import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuyerHomeFilterComponent } from '../buyer-home/buyer-home-filter/buyer-home-filter.component';
import { PostRequirmentComponent } from '../post-requirment/post-requirment.component';

@Component({
  selector: 'app-buyer-home-unlog',
  templateUrl: './buyer-home-unlog.component.html',
  styleUrls: ['./buyer-home-unlog.component.scss']
})
export class BuyerHomeUnlogComponent implements OnInit {

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
