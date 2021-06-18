import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerComponent } from './buyer.component';
import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerHomeComponent } from './buyer-home/buyer-home.component';
import { BuyerFooterComponent } from './buyer-footer/buyer-footer.component';
import { BuyerHeaderComponent } from './buyer-header/buyer-header.component';
import { PostRequirmentComponent } from './post-requirment/post-requirment.component';
import { BuyerVerificatonComponent } from './buyer-verificaton/buyer-verificaton.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BuyerHomeFilterComponent } from './buyer-home/buyer-home-filter/buyer-home-filter.component';
import { AdvanceFilterComponent } from './advance-filter/advance-filter.component';
import { BuyerHomeUnlogComponent } from './buyer-home-unlog/buyer-home-unlog.component';
@NgModule({
  imports: [
    CommonModule,
    BuyerRoutingModule,
    ReactiveFormsModule,
    RouterModule,ToastModule,
    MatDialogModule,
  ],
  declarations: [BuyerComponent,BuyerHomeComponent,BuyerFooterComponent,BuyerHeaderComponent,PostRequirmentComponent,BuyerVerificatonComponent,BuyerHomeFilterComponent,AdvanceFilterComponent,
    BuyerHomeUnlogComponent]
})
export class BuyerModule { }
