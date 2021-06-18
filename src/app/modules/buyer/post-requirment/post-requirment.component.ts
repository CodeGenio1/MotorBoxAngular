import { MessageService } from 'primeng/api';
import { BuyerService } from './../../../services/buyer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-requirment',
  templateUrl: './post-requirment.component.html',
  styleUrls: ['./post-requirment.component.scss']
})
export class PostRequirmentComponent implements OnInit {

  isError = false;
  myForm: FormGroup;
  constructor(private fb: FormBuilder, public buyerService: BuyerService, private router: Router
    , private _ActivatedRoute: ActivatedRoute, private userService: UserService, private message: MessageService) { }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.myForm = this.fb.group(
      {
        carAge: ['', Validators.compose([Validators.required])],
        color: ['', Validators.compose([Validators.required])],
        capacity: ['', Validators.compose([Validators.required])],
        fuelType: ['', Validators.compose([Validators.required])],
        preferences: ['', Validators.compose([Validators.required])],
      }
    );
  }

  async PostRequirement() {
    if (this.myForm.valid) {
      try {
        const res = await this.buyerService.PostRequirement(this.myForm.value);
        if (res) {
          this.message.add({ severity: 'success', summary: 'Success', detail: 'Requirement successfuly posted.' });
          this.isError = false;
          setTimeout(() => {
            this.router.navigate(['buyer/home']);
          }, 1000);
        } else {
          this.isError = true;
        }
      } catch (err) {
        debugger
        this.isError = true;
        this.message.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      }
    } else {
      this.isError = true;
    }
  }
}
