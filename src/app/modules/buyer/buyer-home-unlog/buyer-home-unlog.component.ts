import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { BuyerHomeFilterComponent } from '../buyer-home/buyer-home-filter/buyer-home-filter.component';
import { PostRequirmentComponent } from '../post-requirment/post-requirment.component';

@Component({
  selector: 'app-buyer-home-unlog',
  templateUrl: './buyer-home-unlog.component.html',
  styleUrls: ['./buyer-home-unlog.component.scss']
})
export class BuyerHomeUnlogComponent implements OnInit {
  isLogin = false;
  constructor(public dialog: MatDialog, public userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
    this.isLogin = this.userService.isLoggedIn()
  }
  openDialog() {
    this.dialog.open(BuyerHomeFilterComponent, {
      width: '60%',
      height: '90vh',
    });

  }
  openRequirmentDailoge() {
    if (!this.isLogin) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You have to login first to Use this feature' });
    }
    // this.dialog.open(PostRequirmentComponent, {
    // });
  }
}
