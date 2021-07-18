import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageService } from 'primeng/api';
import { SellerRegistrationService } from 'src/app/services/seller-registration.service';

@Component({
  selector: 'app-send-offer',
  templateUrl: './send-offer.component.html',
  styleUrls: ['./send-offer.component.scss']
})
export class SendOfferComponent implements OnInit {
  vehicleList: any[] = [];
  requriementData: any;
  myForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<SendOfferComponent>, @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder, private sellerRegistrationService: SellerRegistrationService, private messageService: MessageService) {
    this.requriementData = data.requriement;
    this.vehicleList = data.vehicleList;
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.myForm = this.fb.group(
      {
        requirementId: [this.requriementData ? this.requriementData._id : '', Validators.compose([Validators.required])],
        vehicleId: ['', Validators.compose([Validators.required])],

      }
    );
  }
  async sendOffer(id) {

    this.myForm.get("vehicleId").setValue(id);
    if (this.myForm.valid) {
      try {
        const res = await this.sellerRegistrationService.submitOffer(this.myForm.value)
        if (res) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Offer Send Successfully.' });
          setTimeout(() => {
            this.dialogRef.close();
          }, 500);
        }

      } catch (err) {
        err.error.message.forEach(element => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: element.msg });
        });
      }
    }
  }
  showSuccess(data: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: data });
  }
  showError(data: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: data });
  }
  onClose() {
    this.dialogRef.close();
  }
  makeTrustedImage(item) {
    const style = 'url(' + item + ')';
    return style;
  }
}
