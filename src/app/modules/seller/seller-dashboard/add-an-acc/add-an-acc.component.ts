import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { SellerRegistrationService } from 'src/app/services/seller-registration.service';
import { MessageService } from 'primeng/api';
import { isArray } from 'util';

@Component({
  selector: 'app-add-an-acc',
  templateUrl: './add-an-acc.component.html',
  styleUrls: ['./add-an-acc.component.scss']
})
export class AddAnAccComponent implements OnInit {
  eye = {
    show: "./assets/img/eye.png",
    hide: "./assets/img/eye-splash.png",
  }
  hide = true;
  hideConfirmPass = true;
  icon = "./assets/img/eye.png";
  iconConfirmPass = "./assets/img/eye.png";
  isError = false;
  representativeForm: any;
  mismatchError = false;
  RegexMatchError = false;
  constructor(private dialogRef: MatDialogRef<AddAnAccComponent>, private sellerRegistrationService: SellerRegistrationService,
    private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.representativeForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  onClose() {
    this.dialogRef.close();
  }
  ShowPassword() {
    this.hide = !this.hide;
    this.hide ? this.icon = this.eye.show : this.icon = this.eye.hide;
  }
  ShowConfirmPassword() {
    this.hideConfirmPass = !this.hideConfirmPass;
    this.hideConfirmPass ? this.iconConfirmPass = this.eye.show : this.iconConfirmPass = this.eye.hide;
  }

  onPasswordChange() {
    if ((this.representativeForm.value.confirmPassword == this.representativeForm.value.password)) {
      this.mismatchError = false;

    } else {
      this.mismatchError = true;
    }
  }

  checkPasswordRegex() {
    const a = this.representativeForm.value.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    if (!a) {
      this.RegexMatchError = true
    } else {
      this.RegexMatchError = false
    }
    this.onPasswordChange();
  }
  async addRepresentative() {
    if (this.representativeForm.valid) {
      try {
        const res = await this.sellerRegistrationService.addSellerRepresentative(this.representativeForm.value);
        // if (res) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Representative Created Successfully` });
          // alert('Register Successfull');
          this.representativeForm.reset();
          this.dialogRef.close('created');
        // }
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
  check() {
    // (this.representativeForm.get('password').value === '' && this.representativeForm.get('confirmPassword').hasError('mismatch'))
    if (this.representativeForm.valid && !this.mismatchError && !this.RegexMatchError) {
      console.log('ok')
    } else {
      console.log('Not ok')
    }
  }
}
