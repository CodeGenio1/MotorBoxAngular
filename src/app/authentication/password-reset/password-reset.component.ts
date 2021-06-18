import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  myForm:FormGroup;
  constructor(private messageService: MessageService, private fb: FormBuilder, public authService: AuthenticationService, private router: Router
    , private _ActivatedRoute: ActivatedRoute, private userService: UserService) { }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    });
  }
  onPasswordChange() {
    if (this.confirm_password.value == this.password.value) {
      this.confirm_password.setErrors(null);
    } else {
      this.confirm_password.setErrors({ mismatch: true });
    }
  }

  // getting the form control elements
  get password(): AbstractControl {
    return this.myForm.controls['password'];
  }

  get confirm_password(): AbstractControl {
    return this.myForm.controls['confirmPassword'];
  }
  reset(){

  }
}

