import { BuyerComponent } from './buyer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerHomeComponent } from './buyer-home/buyer-home.component';
import { BuyerVerificatonComponent } from './buyer-verificaton/buyer-verificaton.component';
import { AdvanceFilterComponent } from './advance-filter/advance-filter.component';
import { BuyerHomeUnlogComponent } from './buyer-home-unlog/buyer-home-unlog.component';
import { BuyerResolver } from './buyer-resolver';
import { AuthGuard } from 'src/app/services/auth.guard';
const routes: Routes = [
  {
    path: 'buyer', component: BuyerComponent, children: [
      { path: 'home', component: BuyerHomeComponent, resolve: { data: BuyerResolver } },
      { path: 'buyer-home', component: BuyerHomeUnlogComponent },
      { path: 'car-verification', component: BuyerVerificatonComponent, resolve: { data: BuyerResolver } },
      { path: 'advance-filter', component: AdvanceFilterComponent, canActivate: [AuthGuard] },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
