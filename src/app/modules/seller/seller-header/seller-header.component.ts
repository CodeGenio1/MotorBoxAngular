import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.scss']
})
export class SellerHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

}
