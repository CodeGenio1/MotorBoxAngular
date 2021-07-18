import { MessageService } from 'primeng/api';
import { BuyerService } from './../../../services/buyer.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CarService } from 'src/app/services/car.service';
import { getAllMakeAndModel } from '../../shell/constants/getAllMakeAndModel';
import * as _ from 'lodash';

@Component({
  selector: 'app-post-requirment',
  templateUrl: './post-requirment.component.html',
  styleUrls: ['./post-requirment.component.scss']
})
export class PostRequirmentComponent implements OnInit {

  isError = false;
  myForm: FormGroup;
  Years: any;
  data: any;
  requiredData: any;
  makeList: any[] = [];
  allMakeList:any[] =[];
  allModelList:any[] =[];
  modelList: any[] = [];
  color: any[] = ['Red','Green','Blue','Black','White','Grey','Yellow','Silver'];
  constructor(
    public dialogRef: MatDialogRef<PostRequirmentComponent>, private carService: CarService,
    private fb: FormBuilder, public buyerService: BuyerService, private router: Router,
    private message: MessageService, @Inject(MAT_DIALOG_DATA) data) {
    this.data = data
  }
  ngOnInit() {
    if (this.data.id != null) {
      this.getRequirementById(this.data.id)
    }

    this.getCarsYears();
    this.getMakeAndModel(2001);
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group(
      {
        make: [this.requiredData ? this.requiredData.make : '', Validators.compose([Validators.required])],
        model: [this.requiredData ? this.requiredData.model : '', Validators.compose([Validators.required])],
        carAge: [this.requiredData ? this.requiredData.carAge : ''],
        color: [this.requiredData ? this.requiredData.color : ''],
        capacity: [this.requiredData ? this.requiredData.capacity : ''],
        fuelType: [this.requiredData ? this.requiredData.fuelType : ''],
        preferences: [this.requiredData ? this.requiredData.preferences : ''],
        bodyStyle: [this.requiredData ? this.requiredData.bodyStyle : ''],
        engineSize: [this.requiredData ? this.requiredData.engineSize : ''],
        noOfSeats: [this.requiredData ? this.requiredData.noOfSeats : ''],
        noOfDoors: [this.requiredData ? this.requiredData.noOfDoors : ''],
        performance: [this.requiredData ? this.requiredData.performance : ''],
        year: [this.requiredData ? this.requiredData.year : '']
      }
    );
  }
  getCarsYears() {
    this.carService.getCarsYears().then((res: any) => {
      res.forEach(element => {
        delete element._id
      });
      this.Years = _.sortBy(res, 'year');
      if (this.requiredData) {
        this.myForm.get("year").setValue(+this.requiredData.year);
      }
    });
  }
  yearSelected(year) {
    this.myForm.get("make").setValue(null);
    this.myForm.get("model").setValue(null);
    if (year == null) {
      this.makeList = [];
      this.modelList = [];
    } else {
      this.getMakeAndModel(year);
    }
  }
  getMakeAndModel(year) {
    this.carService.getMakeAndModel(year).then((res: any) => {
      const carData = getAllMakeAndModel(res);
      this.allMakeList = carData.makeList;
      this.allModelList = carData.modelList;
      this.makeList = carData.makeList;
      if (this.requiredData) {
        this.makeChange(this.requiredData.make);
        this.myForm.get("make").setValue(this.requiredData.make);
        this.myForm.get("model").setValue(this.requiredData.model);
      }
    });

  }

  makeChange(make) {
    this.modelList = this.allModelList.filter(x => x.make === make).map(x => x.model);
  }
  getRequirementById(id) {
    this.buyerService.getRequirementById(id).then((res: any) => {
      this.requiredData = res;
      this.createForm();
    });
  }
  async PostRequirement() {
    if (this.myForm.valid) {
      try {
        const res = await this.data.id === null ? this.buyerService.PostRequirement(this.myForm.value) :
          this.buyerService.UpdateRequirement(this.data.id, this.myForm.value);
        if (res) {
          this.message.add({ severity: 'success', summary: 'Success', detail: 'Requirement successfuly posted.' });
          this.isError = false;
          setTimeout(() => {
            this.router.navigate(['buyer/home']);
            this.dialogRef.close();
          }, 1000);
        } else {
          this.isError = true;
        }
      } catch (err) {
        this.isError = true;
        this.message.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      }
    } else {
      this.isError = true;
    }
  }
}
