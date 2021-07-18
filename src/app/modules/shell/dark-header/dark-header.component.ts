import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
declare const $: any;
@Component({
  selector: 'app-dark-header',
  templateUrl: './dark-header.component.html',
  styleUrls: ['./dark-header.component.scss']
})
export class DarkHeaderComponent implements OnInit {
  public show: boolean = false;
  public buttonName: any = 'Show';
  user: any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    const user = this.userService.getUser();
    if (user) {
      this.user = user.user;
    }
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
