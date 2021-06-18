import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isError = false;
  myForm: FormGroup;
  constructor(private fb: FormBuilder, public authService: AuthenticationService, private router: Router
    , private _ActivatedRoute: ActivatedRoute,private userService:UserService) { }
  ngOnInit() {
    this.createForm();
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
        role: ['Buyer'],
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
          alert('Register Successfull');
          this.router.navigate(['seller-dashboard']);
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
