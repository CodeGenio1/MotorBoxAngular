import { CustomPaginatorComponent } from './custom-paginator/custom-paginator.component';
import { BuyerFooterComponent } from './buyer-footer/buyer-footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { DarkHeaderComponent } from './dark-header/dark-header.component';
import { FooterComponent } from './footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule
  ],
  declarations: [
    ShellComponent,
    HeaderComponent,
    BuyerFooterComponent,
    DarkHeaderComponent,
    FooterComponent,
    CustomPaginatorComponent
  ],
  exports: [
    ShellComponent,
    HeaderComponent,
    BuyerFooterComponent,
    DarkHeaderComponent,
    FooterComponent,
    CustomPaginatorComponent
  ]
})
export class ShellModule { }
