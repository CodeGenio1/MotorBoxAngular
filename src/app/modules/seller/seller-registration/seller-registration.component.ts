import { async } from '@angular/core/testing';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { SellerRegistrationService } from 'src/app/services/seller-registration.service';
import { MessageService } from 'primeng/api';
import { getAllMakeAndModel } from '../../shell/constants/getAllMakeAndModel';
import { CarService } from 'src/app/services/car.service';
import { isNullOrUndefined } from 'util';
import * as _ from 'lodash';
declare const $: any;

@Component({
  selector: 'app-seller-registration',
  templateUrl: './seller-registration.component.html',
  styleUrls: ['./seller-registration.component.scss']
})
export class SellerRegistrationComponent implements OnInit, AfterViewInit {
  currentTab = 1;
  stars: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  isError = false;
  myForm: FormGroup;
  thumbnail = null;
  images: any[] = [];
  registrationForm: any;
  VehicleRegistration: any;
  MotVed: any;
  selectedValue = 0;
  user: any;
  formError = {
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  }
  Years: any;
  makeList: any[] = [];
  allMakeList: any[] = [];
  modelList: any[] = [];
  allModelList: any[] = [];
  vehicleId: any;
  make: any;
  selectedYear: any;
  errMessage = 'Required Fields are Missing';
  isRegistrationValid: any;
  constructor(private fb: FormBuilder, public authService: AuthenticationService, private router: Router
    , public userService: UserService, private sellerRegistrationService: SellerRegistrationService,
    private messageService: MessageService, private carService: CarService, private route: ActivatedRoute,) {
    this.vehicleId = this.route.snapshot.params.id;
    if (!isNullOrUndefined(this.vehicleId)) {
      this.getvehicleById(this.vehicleId);
    }
  }

  ngOnInit() {
    const user = this.userService.getUser();
    if (user) {
      this.user = user.user
    }

    this.getCarsYears();
    this.getMakeAndModel(2001);
    this.createForm();
    this.createRegistrationForm();

  }
  getvehicleById(id) {
    this.sellerRegistrationService.getVehicleById(id).then((res: any) => {
      this.VehicleRegistration = res.vehicle;
      this.createRegistrationForm();
    });
  }
  ngAfterViewInit() {
  }
  getData() {
    if (this.registrationForm.value.registrationNumber.length === 7) {

      this.sellerRegistrationService.getDataPackage(this.registrationForm.value.registrationNumber).then((data: any) => {
        // console.log(Object.keys(data.Response.DataItems).length > 0);
        if (Object.keys(data.Response.DataItems).length > 0) {
          const obj = this.registrationForm.value.registrationNumber;
          this.VehicleRegistration = _.mapKeys(data.Response.DataItems.VehicleRegistration, (v, k) => _.camelCase(k))
          this.VehicleRegistration.registrationNumber = obj;
          this.MotVed = data.Response.DataItems.VehicleStatus.MotVed;

          this.createRegistrationForm();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `No vehicle data found for VRM ${this.registrationForm.value.registrationNumber}` });
        }
      });

    }
  }
  async deleteImage(index) {
    if (this.vehicleId && this.images[index]._id) {
      await this.sellerRegistrationService.deletePostedCarImage(this.images[index]._id)
    }
    this.images.splice(index, 1);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Image Removed Successfully' });

  }
  async deleteThumbnail(id?) {
    // if (this.vehicleId && this.thumbnail.id) {
    //   await this.sellerRegistrationService.deletePostedCarImage(this.images[index]._id)
    // }
    this.thumbnail = null;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Image Removed Successfully' });
  }
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let imageDatas = event.target.files;
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        let This = this;
        reader.onload = (event: any) => {
          let imageData = imageDatas[i];
          const image = imageData.name.split('.');
          const name = image[0];
          const ext = image[1];
          This.images.push({
            contentType: imageData.type,
            data: event.target.result,
            fileSize: imageData.size,
            displayName: name,
            description: name,
            fileExtension: ext,
            fileName: imageData.name
          });
          this.registrationForm.controls['images'].setValue(This.images);

        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  onThumbnailChange(event) {
    if (event.target.files && event.target.files[0]) {
      let imageDatas = event.target.files;
      var filesAmount = event.target.files.length;
      var reader = new FileReader();

      let This = this;
      reader.onload = (event: any) => {
        let imageData = imageDatas[0];
        const image = imageData.name.split('.');
        const name = image[0];
        const ext = image[1];
        const thumbnail = {
          contentType: imageData.type,
          data: event.target.result,
          fileSize: imageData.size,
          displayName: name,
          description: name,
          fileExtension: ext,
          fileName: imageData.name
        };
        This.thumbnail = thumbnail;
        this.registrationForm.controls['thumbnail'].setValue(This.thumbnail);

        console.log(event.target.result);
        // this.thumbnail = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  showNew(num) {
    if (num <= this.currentTab) {
      this.currentTab = num;
    }
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
        role: ['Seller'],
        standardDealer: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
        businessInformation: ['']
      }
    );
  }
  createRegistrationForm() {
    this.registrationForm = this.fb.group(
      {
        registrationNumber: [this.VehicleRegistration ? this.VehicleRegistration.registrationNumber : '', Validators.compose([Validators.required])],
        color: [this.VehicleRegistration ? this.VehicleRegistration.colour ?
          this.VehicleRegistration.colour : this.VehicleRegistration.color : ''],
        gearbox: [this.VehicleRegistration ? this.VehicleRegistration.gearbox : ''],
        weight: [this.VehicleRegistration ? this.VehicleRegistration.weight : ''],
        engineNumber: [this.VehicleRegistration ? this.VehicleRegistration.engineNumber : '',],
        make: [this.VehicleRegistration ? this.VehicleRegistration.make : '', Validators.compose([Validators.required])],
        model: [this.VehicleRegistration ? this.VehicleRegistration.model : '', Validators.compose([Validators.required])],
        year: [this.VehicleRegistration ? this.VehicleRegistration.yearOfManufacture ?
          this.VehicleRegistration.yearOfManufacture : this.VehicleRegistration.year : '', Validators.compose([Validators.required])],
        modelSetupDate: [this.VehicleRegistration ? this.VehicleRegistration.modelSetupDate : ''],
        bodyStyle: [this.VehicleRegistration ? this.VehicleRegistration.bodyStyle : ''],
        exported: [this.VehicleRegistration ? this.VehicleRegistration.exported : ''],
        firstRegisterd: [this.VehicleRegistration ? this.VehicleRegistration.firstRegisterd : ''],
        scrapped: [this.VehicleRegistration ? this.VehicleRegistration.scrapped : ''],
        doorPlan: [this.VehicleRegistration ? this.VehicleRegistration.doorPlan : ''],
        modelVariant: [this.VehicleRegistration ? this.VehicleRegistration.modelVariant : ''],
        fuel: [this.VehicleRegistration ? this.VehicleRegistration.fuel : ''],
        vrm: [this.VehicleRegistration ? this.VehicleRegistration.vrm : ''],
        keeperChange: [this.VehicleRegistration ? this.VehicleRegistration.keeperChange : ''],
        co2Emissions: [this.VehicleRegistration ? this.VehicleRegistration.co2Emissions : ''],
        irishImport: [this.VehicleRegistration ? this.VehicleRegistration.irishImport : ''],
        seating: [this.VehicleRegistration ? this.VehicleRegistration.seating : ''],
        keeperCount: [this.VehicleRegistration ? this.VehicleRegistration.keeperCount : ''],
        v5CertificationCount: [this.VehicleRegistration ? this.VehicleRegistration.v5CertificationCount : ''],
        vicStatus: [this.VehicleRegistration ? this.VehicleRegistration.vicStatus : ''],
        vedRate: [this.MotVed ? this.MotVed.VedRate.Standard.twelveMonth ?
          this.MotVed.VedRate.Standard.twelveMonth : this.VehicleRegistration.vedRate : ''],
        vedYear: [this.VehicleRegistration ? this.VehicleRegistration.vedYear : ''],
        width: [this.VehicleRegistration ? this.VehicleRegistration.width : ''],
        length: [this.VehicleRegistration ? this.VehicleRegistration.length : ''],
        height: [this.VehicleRegistration ? this.VehicleRegistration.height : ''],
        towingWeight: [this.VehicleRegistration ? this.VehicleRegistration.towingWeight : ''],
        wheelBase: [this.VehicleRegistration ? this.VehicleRegistration.wheelBase : ''],
        axels: [this.VehicleRegistration ? this.VehicleRegistration.axels : ''],
        plateChange: [this.VehicleRegistration ? this.VehicleRegistration.plateChange : ''],
        valves: [this.VehicleRegistration ? this.VehicleRegistration.valves : ''],
        aspiration: [this.VehicleRegistration ? this.VehicleRegistration.aspiration : ''],
        cylinderType: [this.VehicleRegistration ? this.VehicleRegistration.cylinderType : ''],
        valveGear: [this.VehicleRegistration ? this.VehicleRegistration.valveGear : ''],
        bore: [this.VehicleRegistration ? this.VehicleRegistration.bore : ''],
        stroke: [this.VehicleRegistration ? this.VehicleRegistration.stroke : ''],
        euroStatus: [this.VehicleRegistration ? this.VehicleRegistration.euroStatus : ''],
        typeApproval: [this.VehicleRegistration ? this.VehicleRegistration.typeApproval : ''],
        mpg: [this.VehicleRegistration ? this.VehicleRegistration.mpg : ''],
        mileage: [this.VehicleRegistration ? this.VehicleRegistration.mileage : ''],
        images: [this.VehicleRegistration ? this.VehicleRegistration.images : []],
        price: [this.VehicleRegistration ? this.VehicleRegistration.price : ''],
        condition: [this.VehicleRegistration ? this.VehicleRegistration.condition : ''],
        thumbnail: [this.VehicleRegistration ? this.VehicleRegistration.thumbnail : []],
      }
    );
    this.selectedValue = this.registrationForm.value.condition;
    this.thumbnail = this.registrationForm.value.thumbnail;
    if (this.registrationForm.value.images) {
      this.images = this.registrationForm.value.images;
    }
  }
  async signUp() {
    if (this.myForm.valid) {
      try {
        this.myForm.value.role = this.myForm.value.standardDealer == true ? "Dealer" : "Buyer";
        const res = await this.authService.signUp(this.myForm.value);
        if (res) {
          const loginform = {
            email: this.myForm.value.email,
            password: this.myForm.value.password,
          }
          const loginRes = await this.authService.login(loginform);
          if (loginRes) {
            this.userService.loginUser(loginRes);
            this.isError = false;
            await this.postCar();
          } else {
            this.isError = true;
          }
        } else {
          this.isError = true;
        }
      } catch (err) {
        this.isError = true;
        err.error.message.forEach(element => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: element.msg });
        });
      }
    }
  }

  async postCar() {
    if (this.registrationForm.valid) {
      try {
        if (!this.vehicleId) {
          await this.sellerRegistrationService.postCar(this.registrationForm.value);
          this.router.navigate(['/seller/seller-dashboard']);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Vehicle is Added' });
        } else {
          // let updatedImages = []
          // this.images.forEach((element, i) => {
          //   if (!element._id) {
          //     updatedImages.push(element)
          //   }
          // });

          // this.registrationForm.controls['images'].setValue(updatedImages);
          await this.sellerRegistrationService.updateCar(this.vehicleId, this.registrationForm.value);
          this.router.navigate(['/seller/seller-dashboard']);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Vehicle is Updated' });
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
        this.currentTab = 1;
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errMessage });
      this.currentTab = 1;
    }
  }
  countStar(star) {
    this.selectedValue = star;
    this.registrationForm.controls[`condition`].setValue(star);
  }
  validateStep1(currentTab) {
    if (this.registrationForm.value.registrationNumber !== '' && !this.vehicleId) {
      this.sellerRegistrationService.validateRegistrationNo(this.registrationForm.value.registrationNumber).then((res: any) => {
        this.isRegistrationValid = res;
        if (this.isRegistrationValid.validation) {
          this.checkValidateStep1(currentTab);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.isRegistrationValid.message });
          this.formError.step1 = true;
        }
      });
    } else {
      this.checkValidateStep1(currentTab);
    }
  }
  checkValidateStep1(currentTab) {
    if (this.registrationForm.get('registrationNumber').hasError('required') || this.registrationForm.get('make').hasError('required')
      // || this.registrationForm.get('engineNumber').hasError('required')
      // || this.registrationForm.get('year').hasError('required') || this.registrationForm.get('color').hasError('required')
      // || this.registrationForm.get('gearbox').hasError('required') || this.registrationForm.get('fuel').hasError('required')
      // || this.registrationForm.get('seating').hasError('required')
      || this.registrationForm.get('model').hasError('required')) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errMessage });
      this.formError.step1 = true;
    }
    else {
      this.currentTab = currentTab + 1;
    }
  }
  validateStep2(currentTab) {
    // if ( // this.registrationForm.get('bodyStyle').hasError('required')
    //   //|| this.registrationForm.get('plateChange').hasError('required') || this.registrationForm.get('mpg').hasError('required')
    //   // || this.registrationForm.get('mileage').hasError('required')
    //   ) {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errMessage });
    //   this.formError.step2 = true;
    // }
    // else {
      this.currentTab = currentTab + 1;
    // }
  }
  validateStep3(currentTab) {
    // if (
    //   this.registrationForm.get('length').hasError('required')
    //   || this.registrationForm.get('width').hasError('required')
    //   //|| this.registrationForm.get('weight').hasError('required')
    //   // || this.registrationForm.get('height').hasError('required') || this.registrationForm.get('width').hasError('required')
    //   // || this.registrationForm.get('cylinderType').hasError('required') || this.registrationForm.get('valves').hasError('required')
    //   // || this.registrationForm.get('valveGear').hasError('required') || this.registrationForm.get('stroke').hasError('required')
    //   // || this.registrationForm.get('bore').hasError('required') || this.registrationForm.get('wheelBase').hasError('required')
    //   // || this.registrationForm.get('axels').hasError('required') || this.registrationForm.get('aspiration').hasError('required'))
    // ) {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errMessage });
    //   this.formError.step3 = true;
    // }
    // else {
      this.currentTab = currentTab + 1;
    // }
  }
  async validateStep4(currentTab) {
    // if (this.registrationForm.get('condition').hasError('required') || this.registrationForm.get('price').hasError('required')
    //   || this.images.length <= 0) {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errMessage });
    //   this.formError.step4 = true;
    // }
    // else {
      if (this.userService.isLoggedIn()) {
        await this.postCar();
      } else {
        this.currentTab = currentTab + 1;
      }
    // }

  }
  getCarsYears() {
    this.carService.getCarsYears().then((res: any) => {
      res.forEach(element => {
        delete element._id
      });
      this.Years = _.sortBy(res, 'year');
      if (this.VehicleRegistration) {
        this.registrationForm.get("year").setValue(+this.VehicleRegistration.year);
      }

    });
  }
  yearSelected(year) {
    this.registrationForm.get("make").setValue(null);
    this.registrationForm.get("model").setValue(null);
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
      if (this.VehicleRegistration) {
        this.makeChange(this.VehicleRegistration.make);
        this.registrationForm.get("make").setValue(this.VehicleRegistration.make);
        this.registrationForm.get("model").setValue(this.VehicleRegistration.model);
      }
    });

  }
  makeChange(make) {
    this.modelList = this.allModelList.filter(x => x.make === make).map(x => x.model);
  }
  makeTrustedImage(item) {

    const style = 'url(' + item + ')';
    return style;
  }
  // chechhh(aaa) {
  //   const a = aaa;
  // }
}
