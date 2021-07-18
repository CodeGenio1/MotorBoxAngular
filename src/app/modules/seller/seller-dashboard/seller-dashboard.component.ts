import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SellerRegistrationService } from 'src/app/services/seller-registration.service';
import { AddAnAccComponent } from './add-an-acc/add-an-acc.component';
import { SendOfferComponent } from './send-offer/send-offer.component';
import { environment } from './../../../../environments/environment';
import { fromNow } from '../../shell/constants/date-time';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../../shell/delete-dialog/delete-dialog.component';
import { RequirementViewModel, Requirement } from 'src/app/Models/IRequirement';
import { UserService } from 'src/app/services/user.service';
declare const $: any;
@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit {
  PostedCarsList: any[] = [];
  allPostedCarsList: any[] = [];
  SubmitedOfferList: RequirementViewModel[] = [];
  OfferList: any[] = [];
  allOfferList: any[] = [];
  SellersList: any[] = [];
  SellerRequirementList: any[] = [];
  currentTab: number = 1;
  activePage: number = 0;
  rows: number = 5;
  userId: string;
  showMoreData: boolean = false;
  sellerRepresentative: any;
  sortType: any[] = [{ id: 1, name: 'Latest' }, { id: 2, name: 'Oldest' }];
  allRequirementList: any[] = [];
  isExpired = false;
  environmentData = environment;
  constructor(public dialog: MatDialog, private sellerRegistrationService: SellerRegistrationService,
    private router: Router, private messageService: MessageService, public userService: UserService) { }

  async ngOnInit() {
    this.isExpired = this.userService.isTrialExpired();
    await this.getdashboardData();
    this.userId = this.userService.getUser().user.sub;
  }
  async showMoreInfo(Requirement: Requirement) {
    if (!Requirement.viewers.includes(this.userId)) {
      await this.sellerRegistrationService.markRequirementAsViewed(Requirement._id);
      await this.getAllSellerRequirements();
    }
    Requirement.collapse = !Requirement.collapse;
  }
  async getdashboardData() {
    await this.getAllPostedCar();
    await this.getAllSubmitedOffer();
    await this.getAllSellerRequirements()
    await this.getSellerRepresentative();
  }
  async getSellerRepresentative() {
    try {
      const res = await this.sellerRegistrationService.getSellerRepresentative();
      if (res) {
        this.sellerRepresentative = res;
      }
    } catch (error) {

    }
  }
  async getAllSellerRequirements() {
    try {
      const res = await this.sellerRegistrationService.getAllSellerRequirements();
      this.SellerRequirementList = res;
      this.allRequirementList = [];
      res.forEach(item => {
        if (item.requirements && item.requirements.length > 0) {
          item.requirements.forEach(o => {
            const obj = {
              user: item.user,
              noOfViews: o.noOfViews,
              createdDate: o.createdDate,
              make: o.make,
              year: o.year,
              carAge: o.carAge,
              model: o.model,
              color: o.color,
              bodyStyle: o.bodyStyle,
              fuelType: o.fuelType,
              engineSize: o.engineSize,
              preferences: o.preferences,
              noOfSeats: o.noOfSeats,
              noOfDoors: o.noOfDoors,
              capacity: o.capacity,
              imageUrl: o.imageUrl,
              viewers: o.viewers,
              _id: o._id
            }
            this.allRequirementList.push(obj);
          });

          this.allRequirementList = this.sort(this.allRequirementList, 1);

        }
      });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    }
  }
  sortOffer(value) {
    this.allOfferList = this.sort(this.allOfferList, value);
    this.OfferList = Object.assign([], this.allOfferList.slice((this.activePage * this.rows) - this.rows, ((this.activePage * this.rows) - this.rows + this.rows)));
  }
  async getAllSubmitedOffer() {
    try {
      const res = await this.sellerRegistrationService.getAllSubmitedOffer();
      this.SubmitedOfferList = res;
      this.OfferList = [];
      this.allOfferList = [];
      res.forEach(item => {
        if (item.offers && item.offers.length > 0) {
          item.offers.forEach(o => {
            const obj = {
              imageUrl: item?.images[0]?.imageUrl,
              thumbnail: item.thumbnail?.imageUrl,
              make: item.make,
              createdDate: o.createdDate,
              model: item.model,
              color: item.color,
              year: item.year,
              registrationNumber: item.registrationNumber,
              offeredAmount: o?.offeredAmount,
              buyerName: o?.buyerName,
              buyerId: o.buyerId,
              id: item._id
            }
            this.OfferList.push(obj);
            this.allOfferList.push(obj);
          });

        }
      });

      this.allOfferList = this.sort(this.allOfferList, 1);
      this.OfferList = Object.assign([], this.allOfferList.slice((1 * this.rows) - this.rows, ((1 * this.rows) - this.rows + this.rows)));
      // this.sort(this.OfferList, 1);
    } catch (error) {

      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    }
  }

  sort(list, type) {
    if (type === 1) {
      return list.sort((a, b) => {
        return <any>new Date(b.createdDate) - <any>new Date(a.createdDate)
      })

    } else {
      return list.sort((a, b) => {
        return <any>new Date(a.createdDate) - <any>new Date(b.createdDate)
      })
    }
  }
  openSingleCar(id) {
    this.router.navigate(['/single-car', id]);
  }
  async getAllPostedCar() {
    try {
      const res = await this.sellerRegistrationService.getAllPostedCar();
      // this.PostedCarsList = res;
      this.allPostedCarsList = res;
      this.allPostedCarsList = this.sort(this.allPostedCarsList, 1)
      this.PostedCarsList = Object.assign([], this.allPostedCarsList.slice((1 * this.rows) - this.rows, ((1 * this.rows) - this.rows + this.rows)));

    } catch (error) {

      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    }

  }
  getAllSeller() {
    this.sellerRegistrationService.getSellers().then((res: any) => {
      this.SellersList = res;
    });
  }
  openDialog(item) {
    const dialog = this.dialog.open(SendOfferComponent, {
      width: '90%',
      panelClass: 'custom-dialog',
      data: { requriement: item, vehicleList: this.allPostedCarsList }
    });
    dialog.afterClosed().subscribe(() => {
      // Do stuff after the dialog has closed
      this.getAllSubmitedOffer();
    });
  }
  openAnAccount() {
    const dialog = this.dialog.open(AddAnAccComponent, {
      width: '30%',
    });
    dialog.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result == 'created') {
        this.getSellerRepresentative();
      }
    });
  }
  makeTrustedImage(item) {
    const style = 'url(' + item + ')';
    return style;
  }
  calculateDiff(dateSent) {
    const date = fromNow(dateSent)
    return date;
  }
  editVehicle(id) {
    this.router.navigate(['/seller/seller-registration/' + id]);
  }
  deletePostedCar(id) {
    let deletedialogRef = this.dialog.open(DeleteDialogComponent, {});
    deletedialogRef.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result == 'confirm') {
        this.sellerRegistrationService.deletePostedCar(id).then((res: any) => {
          this.getdashboardData();
        });
      }
    });
  }

  deleteRepresentative(id) {
    let deletedialogRef = this.dialog.open(DeleteDialogComponent, {});
    deletedialogRef.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result == 'confirm') {
        this.sellerRegistrationService.deleteRepresentative(id).then((res: any) => {
          this.getSellerRepresentative();
        });
      }
    });
  }
  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber
    this.OfferList = Object.assign([], this.allOfferList.slice((activePageNumber * this.rows) - this.rows, ((activePageNumber * this.rows) - this.rows + this.rows)));
  }
  changeVehiclePage(activePageNumber: number) {
    this.PostedCarsList = Object.assign([], this.allPostedCarsList.slice((activePageNumber * this.rows) - this.rows, ((activePageNumber * this.rows) - this.rows + this.rows)));
  }

}
