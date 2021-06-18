import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddAnAccComponent } from './add-an-acc/add-an-acc.component';
import { SendOfferComponent } from './send-offer/send-offer.component';
declare const $: any;
@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    $(document).ready(function(){
	
      $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');
    
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
    
        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
      })
    
    })

  }
  openDialog() {
    this.dialog.open(SendOfferComponent,{
      width: '90%',
      panelClass: 'custom-dialog'
    });
 
   }
   openAnAccount(){
    this.dialog.open(AddAnAccComponent,{
      width: '30%',
    });
   }
}
