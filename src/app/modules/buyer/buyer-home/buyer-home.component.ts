import { FormBuilder, FormGroup } from '@angular/forms';
import { BuyerService } from './../../../services/buyer.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostRequirmentComponent } from '../post-requirment/post-requirment.component';
import { BuyerHomeFilterComponent } from './buyer-home-filter/buyer-home-filter.component';
import { fromNow } from '../../shell/constants/date-time';
import { UserService } from 'src/app/services/user.service';
import { DeleteDialogComponent } from '../../shell/delete-dialog/delete-dialog.component';
import * as _ from 'lodash';
import { CarService } from 'src/app/services/car.service';
import { getAllMakeAndModel } from '../../shell/constants/getAllMakeAndModel';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-buyer-home',
  templateUrl: './buyer-home.component.html',
  styleUrls: ['./buyer-home.component.scss']
})
export class BuyerHomeComponent implements OnInit {
  postRequirementList: any[] = [];
  Years: any;
  makeList: any[] = [];
  allMakeList: any[] = [];
  modelList: any[] = [];
  allModelList: any[] = [];
  searchForm: FormGroup;
  offerReceivedList: any;
  allofferReceivedList: any[];
  environmentData = environment
  constructor(private fb: FormBuilder, public dialog: MatDialog, private buyerService: BuyerService,
    private userService: UserService, private carService: CarService, private router: Router,) { }

  ngOnInit() {
    const user = this.userService.getUser();
    if (user) {
      this.getAllRequirements();
      this.getOfferReceived();
    }
    this.getCarsYears();
    this.createForm();
  }
  createForm() {
    this.searchForm = this.fb.group(
      {
        year: [''],
        make: [''],
        model: [''],
      }
    );
  }
  async getOfferReceived() {
    let res: any
    res = await this.buyerService.getOfferReceived();
    this.offerReceivedList = res;
    this.allofferReceivedList = [];
    res.forEach(item => {
      if (item.offers && item.offers.length > 0 ) {
        item.offers
        .filter(y=> y.buyerId == this.userService.getUser().user.sub )
        .forEach(o => {
          const obj = {
            price: item.price,
            year: item.year,
            make: item.make,
            model: item.model,
            color: item.color,
            registrationNumber: item.registrationNumber,
            image: item.images[0]?.imageUrl,
            _id: item._id,
            buyerId: o.buyerId,
            createdDate: o.createdDate,
            offeredAmount: o.offeredAmount,
            requirementId: o.requirementId,
            sellerId:o.sellerId._id,
            seller: o.sellerId.fullName,
            sellerProfilePicture: o.sellerId.fullName,
            _offerId: o._id,
          }
          this.allofferReceivedList.push(obj);
        });
        this.allofferReceivedList = this.sort(this.allofferReceivedList);

      }
    });
    console.log(this.offerReceivedList);
  }
  sort(list) {
    return list.sort((a, b) => {
      return <any>new Date(b.createdDate) - <any>new Date(a.createdDate)
    })
  }
  getAllRequirements() {
    this.buyerService.getAllRequirements().then((res: any) => {
      this.postRequirementList = res;
    });
  }
  calculateDiff(dateSent) {
    const date = fromNow(dateSent)
    return date;
  }
  openDialog() {
    this.dialog.open(BuyerHomeFilterComponent, {
      width: '60%',
      height: '90vh',
    });

  }
  openRequirmentDailoge(id = null) {
    const dialogRef = this.dialog.open(PostRequirmentComponent, {
      // width: '40%',
      // height: '90vh',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllRequirements();
      // console.log('The dialog was closed', result);
    });
  }
  deleteRequirement(id) {
    let deletedialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '30%',
    });
    deletedialogRef.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result == 'confirm') {
        // console.log('Deleted');
        this.buyerService.deleteRequirement(id).then((res: any) => {
          this.getAllRequirements();
        });
      }
    });

  }

  getCarsYears() {
    this.carService.getCarsYears().then((res: any) => {
      res.forEach(element => {
        delete element._id
      });
      this.Years = _.sortBy(res, 'year');
    });
  }
  yearSelected(year) {
    this.searchForm.get("make").setValue(null);
    this.searchForm.get("model").setValue(null);
    if (year == null) {
      this.makeList = [];
      this.modelList = [];
    } else {
      this.getMakeAndModel(year);
    }
  }
  getMakeAndModel(year) {
    this.carService.getMakeAndModel(year).then((res: any) => {
      debugger;
      const carData = getAllMakeAndModel(res);
      this.allMakeList = carData.makeList;
      this.allModelList = carData.modelList;
      this.makeList = carData.makeList;
    });

  }
  makeChange(make) {
    this.modelList = this.allModelList.filter(x => x.make === make).map(x => x.model);
  }
  makeTrustedImage(item) {
    const style = 'url(' + item + ')';
    return style;
  }
  startChat(seller, buyer) {
    const groupId = `${seller}-${buyer}`;
    this.router.navigate(['/chat/'+ groupId]);
  }
}
