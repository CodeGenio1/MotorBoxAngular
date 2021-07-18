import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './modules/seller/chat/chat.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [

  {
    path: 'sign-in',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule), canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/seller/seller.module').then(m => m.SellerModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/buyer/buyer.module').then(m => m.BuyerModule)
  },
  {
    path: 'chat', pathMatch: 'full',canActivate: [AuthGuard]  ,component: ChatComponent
  },
  {
    path: 'chat/:id', pathMatch: 'full',canActivate: [AuthGuard]  ,component: ChatComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
