import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  isAgree = false;
  isAgreeError = false;
  RegexMatchError = false;
  mismatchError = false;
  constructor(private messageService: MessageService, private fb: FormBuilder, public authService: AuthenticationService, private router: Router
    , private _ActivatedRoute: ActivatedRoute, private userService: UserService) { }
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
  async login(data) {
    try {
      this.userService.removeRefreshToken();
      this.userService.removeToken();
      const res = await this.authService.login(data);
      if (res) {
        this.userService.loginUser(res);
        this.isError = false;
        this.showSuccess('Login Successfull')
        // alert('Register Successfull');
        const user = this.userService.getUser();
        // if (!isNullOrUndefined(user)) {
        if (user.user.role[0] === "Buyer") {
          this.router.navigate(['/buyer/home']);
        } else {
          this.router.navigate(['/seller/seller-home']);
        }
      } else {
        this.isError = true;
      }
    } catch (err) {
      this.isError = true;
      this.showError(err.message);
    }
  }
  showSuccess(data: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: data });
  }
  showError(data: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: data });
  }
  async signUp() {
    if (!this.isAgree) {
      this.isAgreeError = true;
    }
    if (this.myForm.valid) {
      try {
        const res = await this.authService.signUp(this.myForm.value);
        if (res) {
          this.userService.loginUser(res);
          this.isError = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register Successfull' });
          const data = {
            email: this.myForm.value.email,
            password: this.myForm.value.password,
          }
          await this.login(data);
          // this.router.navigate(['/buyer/home']);
        } else {
          this.isError = true;
        }
      } catch (err) {
        this.isError = true;
        if (Array.isArray(err.error.message)) {
          err.error.message.forEach(element => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: element.msg });
          });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        }
      }
    } else {
      this.isError = true;
    }
  }
  checkPasswordRegex() {
    const a = this.myForm.value.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    if (!a) {
      this.RegexMatchError = true
    } else {
      this.RegexMatchError = false
    }
    this.onPasswordChange();
  }
  onPasswordChange() {
    if (this.myForm.value.confirmPassword !== ''  && (this.myForm.value.confirmPassword !== this.myForm.value.password)) {
      this.mismatchError = true;

    } else {
      this.mismatchError = false;
    }
  }
  onCheck() {
    this.isAgree = !this.isAgree
    if (this.isAgree) {
      this.isAgreeError = false;
    }
  }

}
