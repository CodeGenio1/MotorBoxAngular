import { async } from '@angular/core/testing';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { isArray } from 'util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  changePasswordForm: FormGroup;
  user: any;
  eye = {
    show: "./assets/img/eye.png",
    hide: "./assets/img/eye-splash.png",
  }
  hide = true;
  hideNewPass = true;
  hideConfirmPass = true;
  icon = "./assets/img/eye.png";
  iconNewPass = "./assets/img/eye.png";
  iconConfirmPass = "./assets/img/eye.png";
  isError = false;
  mismatchError = false
  RegexMatchError = false;
  profilePhoto: '';
  userForm: FormGroup;
  constructor(private fb: FormBuilder, public authService: AuthenticationService, private messageService: MessageService,
    public userService: UserService) { }

  ngOnInit() {
    // this.user = this.userService.getUser().user;
    this.getUser();
    this.createForm();
    this.createUserForm();
  }
  ngAfterViewInit() {
    // this.createUserForm();
  }
  async getUser() {
    this.user = await this.authService.getUser();
    this.createForm();
    this.createUserForm();
  }
  createUserForm() {
    if (this.user) {
      this.userForm = this.fb.group({
        phoneNumber: [this.user ? this.user.phoneNumber : ''],
        fullName: [this.user ? this.user.fullName : ''],
        profilePhoto: [this.user?.profilePicture ? this.user.profilePicture : ''],
      });
      this.profilePhoto = this.user.profilePicture;
    }
  }
  changeProfile() {
    let element: HTMLElement = document.getElementsByClassName('changeProfile')[0] as HTMLElement;
    element.click();
  }
  createForm() {
    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  async changePassword() {
    if (this.changePasswordForm.valid) {
      try {
        const res = await this.authService.changePassword(this.changePasswordForm.value);
        if (res) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Password Changed Successfully` });
          // alert('Register Successfull');
          this.changePasswordForm.reset();
        }
      } catch (err) {
        if (isArray(err.error.message)) {
          err.error.message.forEach(element => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: element.msg });
          });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });

        }
        // err.e
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Required Fields are Missing' });
      this.isError = true;
    }
  }
  onPasswordChange() {
    if (this.changePasswordForm.value.confirmPassword == this.changePasswordForm.value.newPassword) {
      this.mismatchError = false;

    } else {
      this.mismatchError = true;
    }
  }
  ShowPassword() {
    this.hide = !this.hide;
    this.hide ? this.icon = this.eye.show : this.icon = this.eye.hide;
  }
  ShowNewPassword() {
    this.hideNewPass = !this.hideNewPass;
    this.hideNewPass ? this.iconNewPass = this.eye.show : this.iconNewPass = this.eye.hide;
  }
  ShowConfirmPassword() {
    this.hideConfirmPass = !this.hideConfirmPass;
    this.hideConfirmPass ? this.iconConfirmPass = this.eye.show : this.iconConfirmPass = this.eye.hide;
  }
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let imageDatas = event.target.files;
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        let This = this;
        reader.onload = (event: any) => {
          This.profilePhoto = event.target.result,
            this.userForm.controls['profilePhoto'].setValue(This.profilePhoto);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  checkPasswordRegex() {
    const a = this.changePasswordForm.value.newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    if (!a) {
      this.RegexMatchError = true
    } else {
      this.RegexMatchError = false
    }
    this.onPasswordChange();
  }
  makeTrustedImage(item) {
    const style = 'url(' + item + ')';
    return style;
  }

  async updateUser() {
    if (this.userForm.valid) {
      try {
        const res = await this.authService.updateUser(this.userForm.value);
        if (res) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `User Updated Successfully` });
          this.getUser();
          // alert('Register Successfull');
        }
      } catch (err) {
        if (isArray(err.error.message)) {
          err.error.message.forEach(element => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: element.msg });
          });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });

        }
        // err.e
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Required Fields are Missing' });
      this.isError = true;
    }
  }
}
