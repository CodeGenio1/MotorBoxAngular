import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { isArray } from 'util';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  resetForm: FormGroup;
  token: any;
  eye = {
    show: "./assets/img/eye.png",
    hide: "./assets/img/eye-splash.png",
  }
  hidePass = true;
  hideConfirmPass = true;
  icon = "./assets/img/eye.png";
  iconPass = "./assets/img/eye.png";
  iconConfirmPass = "./assets/img/eye.png";
  isError = false;
  mismatchError = false
  RegexMatchError = false;
  constructor(private messageService: MessageService, private fb: FormBuilder, public authService: AuthenticationService, private router: Router
    , private _ActivatedRoute: ActivatedRoute, private userService: UserService, private route: ActivatedRoute,) {
    this.token = this.route.snapshot.params.token;
  }
  ngOnInit(): void {
    this.resetForm = this.fb.group({
      token: [this.token ? this.token : '', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    });
  }
  onPasswordChange() {
    if (this.resetForm.value.confirmPassword == this.resetForm.value.password) {
      this.mismatchError = false;

    } else {
      this.mismatchError = true;
    }
  }

  ShowPassword() {
    this.hidePass = !this.hidePass;
    this.hidePass ? this.iconPass = this.eye.show : this.iconPass = this.eye.hide;
  }
  ShowConfirmPassword() {
    this.hideConfirmPass = !this.hideConfirmPass;
    this.hideConfirmPass ? this.iconConfirmPass = this.eye.show : this.iconConfirmPass = this.eye.hide;
  }
  checkPasswordRegex() {
    const a = this.resetForm.value.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    if (!a) {
      this.RegexMatchError = true
    } else {
      this.RegexMatchError = false
    }
    this.onPasswordChange();
  }
  async reset() {
    if (this.resetForm.valid) {
      try {
        const res = await this.userService.resetPassword(this.resetForm.value);
        if (res) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Password Changed Successfully` });
          this.resetForm.reset();
          this.router.navigate(['/sign-in']);
        }
      } catch (err) {
        if (isArray(err.error.message)) {
          err.error.message.forEach(element => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: element.msg });
          });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        }
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Required Fields are Missing' });
      this.isError = true;
    }
  }
}

