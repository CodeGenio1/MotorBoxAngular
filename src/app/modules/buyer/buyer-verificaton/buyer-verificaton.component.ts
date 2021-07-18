import { Component, OnInit } from '@angular/core';
import { BuyerService } from 'src/app/services/buyer.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-buyer-verificaton',
  templateUrl: './buyer-verificaton.component.html',
  styleUrls: ['./buyer-verificaton.component.scss']
})
export class BuyerVerificatonComponent implements OnInit {
  VehicleData: any;
  MotVed: any;
  registrationNo = '';
  constructor(private buyerService: BuyerService) { }

  ngOnInit() {
  }
  checkVehicle() {
    if (this.registrationNo !== '') {
      this.buyerService.vehicleVerification(this.registrationNo).then((res: any) => {
        if (Object.keys(res.Response.DataItems).length > 0) {
          const obj = this.registrationNo;
          this.VehicleData = _.mapKeys(res.Response.DataItems.VehicleRegistration, (v, k) => _.camelCase(k))
          this.VehicleData.registrationNumber = obj;
          this.MotVed = res.Response.DataItems.VehicleStatus.MotVed;
        }
      });
    }
  }
}
