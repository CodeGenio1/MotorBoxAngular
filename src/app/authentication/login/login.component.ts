import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'primeng/api';
import { isArray, isNullOrUndefined } from 'util';
import { SellerRegistrationService } from 'src/app/services/seller-registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isError = false;
  loginForm: FormGroup;
  constructor(private messageService: MessageService, private fb: FormBuilder, public authService: AuthenticationService, private router: Router
    , private _ActivatedRoute: ActivatedRoute, private userService: UserService, private sellerService: SellerRegistrationService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group(
      {
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
      }
    );
  }
  showSuccess(data: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: data });
  }
  showError(data: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: data });
  }
  async login() {
    if (this.loginForm.valid) {
      try {
        this.userService.removeRefreshToken();
        this.userService.removeToken();
        const res = await this.authService.login(this.loginForm.value);
        if (res) {
          this.userService.loginUser(res);
          this.isError = false;
          this.showSuccess('Login Successfull')
          // alert('Register Successfull');
          const user = this.userService.getUser();
          // if (!isNullOrUndefined(user)) {
            const role = user.user.role.find(x => x)
          if (role === "Buyer") {
            this.router.navigate(['/buyer/home']);
          } else {
            if (role === "Dealer") {
             const isExpired = await this.sellerService.checkTrialExpiry();
              this.userService.trialExpired(isExpired);
            }
            this.router.navigate(['/seller/seller-home']);
          }
        } else {
          this.isError = true;
        }
      } catch (err) {
        this.isError = true;
        if (isArray(err.error.message)) {
          err.error.message.forEach(element => {
            this.showError(element.msg);
            // this.messageService.add({ severity: 'error', summary: 'Error', detail: element.msg });
          });
        } else {
          this.showError(err.error.message);
        }
      }
    } else {
      this.isError = true;
    }
  }
}
