import { BuyerComponent } from './buyer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerHomeComponent } from './buyer-home/buyer-home.component';
import { PostRequirmentComponent } from './post-requirment/post-requirment.component';
import { BuyerVerificatonComponent } from './buyer-verificaton/buyer-verificaton.component';
import { AdvanceFilterComponent } from './advance-filter/advance-filter.component';
import { BuyerHomeUnlogComponent } from './buyer-home-unlog/buyer-home-unlog.component';
const routes: Routes = [
  { path: 'buyer', component: BuyerComponent,children:[
    { path: 'home', component: BuyerHomeComponent },
    { path: 'buyer-home', component: BuyerHomeUnlogComponent },
    { path: 'buyer-verification', component: BuyerVerificatonComponent },
    { path: 'advance-filter', component: AdvanceFilterComponent },
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
