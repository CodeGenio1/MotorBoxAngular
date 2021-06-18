import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
declare const $: any;

@Component({
  selector: 'app-seller-registration',
  templateUrl: './seller-registration.component.html',
  styleUrls: ['./seller-registration.component.scss']
})
export class SellerRegistrationComponent implements OnInit {
  currentTab = 1;
   stars: number[] = [1, 2, 3, 4, 5];
   isError = false;
   myForm: FormGroup;
   thumbnail = '';
   images = [];
   constructor(private fb: FormBuilder, public authService: AuthenticationService, private router: Router
     , private _ActivatedRoute: ActivatedRoute,private userService:UserService) { }

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
    this.createForm();
  }
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);


        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onThumbnailChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.thumbnail =event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  showNew(num) {
    if (num <= this.currentTab) {
      this.currentTab = num;
    }
  }


  createForm() {
    this.myForm = this.fb.group(
      {
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
        confirmPassword: ['', Validators.compose([Validators.required])],
        phoneNumber: ['', Validators.compose([Validators.required])],
        fullName: ['', Validators.compose([Validators.required])],
        dateOfBirth: [new Date().toISOString().split('T')[0], Validators.compose([Validators.required])],
        role: ['Dealer'],
        businessInformation:['car dealer']
      }
    );
  }
  // "dateOfBirth" :"",
  //   "email" :"1test5@test.com",
  //   "fullName" :"Khurram Ali",
  //   "phoneNumber" :"09007860111",
  //   "password" :"Panda123@",
  //   "confirmPassword" :"Panda123@",
  //   "role" :"Buyer"

  async signUp() {
    if (this.myForm.valid) {
      try {
        const res = await this.authService.signUp(this.myForm.value);
        if (res) {
          this.userService.loginUser(res);
          this.isError = false;
         // alert('Register Successfull');
          //this.router.navigate(['seller-dashboard']);
        } else {
          this.isError = true;
        }
      } catch (err) {
        this.isError = true;
        err.error.message.forEach(element => {
          alert(element.msg);
        });
      }
    }
  }
}
