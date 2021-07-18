import { Component, Host, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PackagesComponent } from '../packages/packages.component';
import { MessageService } from 'primeng/api';
import { PaymentHelperService } from 'src/app/services/paymentHelper.service';
import { Inject } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-subscription-information',
  templateUrl: './subscription-information.component.html',
  styleUrls: ['./subscription-information.component.scss']
})
export class SubscriptionInformationComponent implements OnInit {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  paymentForm: FormGroup;
  isDisabled = false;
  packageData: any;
  environmentData = environment;
  constructor(private dialogRef: MatDialogRef<SubscriptionInformationComponent>, @Inject(MAT_DIALOG_DATA) data
    , private bodyComp: PackagesComponent
    , private fb: FormBuilder, private paymentHelperService: PaymentHelperService
    , private message: MessageService) {
    this.packageData = data
  }

  ngOnInit() {
    this.createForm();
    this.bodyComp.initialize();
    this.paymentHelperService.getDisable().subscribe(res => {
      this.isDisabled = res;
    })

  }
  createForm() {
    this.paymentForm = this.fb.group(
      {
        nameOnCard: ['Test', Validators.compose([Validators.required])],
        cardNo: ['4242424242424242', Validators.compose([Validators.required, Validators.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$')])],
        cvc: ['343', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(3)])],
        expiryDate: ['', Validators.compose([Validators.required])],
        amount: ['79', Validators.compose([Validators.required])]
      });
  }
  async pay() {
    try {
      this.isDisabled = true;
      await this.bodyComp.charge();
    } catch (error) {
      alert(error)
    }

  }
  onClose() {
    this.dialogRef.close();
  }
}
