import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public show: boolean = false;
  public buttonName: any = 'Show';
  user: any;
  isLogin = false;
  selectionHeader = false;
  buyerHomeHeader = false;
  sellerHomeHeader = false;
  moreFilterHeader = false;
  statusBtn = false;
  sellerRgHeader = false;
  changeLinkFc = false;
  btnColorChange = false;
  hideBtn = false;
  constructor(public userService: UserService, private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url == "/") {
        this.selectionHeader = false;
        this.buyerHomeHeader = false;
        this.btnColorChange = false;
        this.changeLinkFc = false;
      }
      else if (event.url == "/buyer/home") {
        this.buyerHomeHeader = true;
        this.selectionHeader = false;
        this.sellerRgHeader = false;
        this.changeLinkFc = false;
        this.btnColorChange = false;
        this.hideBtn = true;
      }
      else if (event.url == "/seller/seller-home") {
        this.sellerHomeHeader = true;
        this.buyerHomeHeader = false;
        this.selectionHeader = false;
        this.sellerRgHeader = false;
        this.changeLinkFc = false;
        this.btnColorChange = false;

      }
      else if (event.url == "/buyer/advance-filter") {
        this.moreFilterHeader = true;
        this.sellerHomeHeader = false;
        this.buyerHomeHeader = false;
        this.selectionHeader = false;
        this.sellerRgHeader = false;
        this.changeLinkFc = false;
        this.btnColorChange = false;

      }

      else if (event.url == "/buyer/car-verification") {
        this.moreFilterHeader = true;
        this.statusBtn = true;
        this.sellerHomeHeader = false;
        this.buyerHomeHeader = false;
        this.selectionHeader = false;
        this.sellerRgHeader = false;
        this.changeLinkFc = false;
        this.btnColorChange = false;

      }
      else if (event.url == "/seller/seller-registration") {
        this.hideBtn = true;
        this.btnColorChange = true;
        this.sellerRgHeader = true;
        this.changeLinkFc = true;
        this.moreFilterHeader = false;
        this.statusBtn = false;
        this.sellerHomeHeader = false;
        this.buyerHomeHeader = false;
        this.selectionHeader = false;
      }
      else if (event.url == "/seller/seller-dashboard") {
        this.selectionHeader = true;
        this.sellerRgHeader = false;
        this.changeLinkFc = false;
        this.moreFilterHeader = false;
        this.statusBtn = false;
        this.sellerHomeHeader = false;
        this.buyerHomeHeader = false;
        this.selectionHeader = false;
        this.statusBtn = false;

      }


    });
  }

  ngOnInit() {
    this.isLogin = this.userService.isLoggedIn();
    this.userService.getUserFullname();

    $(document).ready(function () {

      //MOBILE ONE AND MOBILE THREE
      var menu = "close";
      $(".mobile-one .menu-toggle, .mobile-three .menu-toggle").click(function () {

        if (menu === "close") {
          $(this).parent().next(".mobile-nav").css("transform", "translate(0, 31px)");
          menu = "open";
        } else {
          $(this).parent().next(".mobile-nav").css("transform", "translate(140%, 31px)");
          menu = "close";
        }
      });
      $(".nav-close").click(function () {
        $(".mobile-nav").css("transform", "translate(140%, 31px)")();
      });
    });

  }
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  signOut() {
    this.userService.logout();
    this.router.navigate(['/sign-in']);
  }
}
