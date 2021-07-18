
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPackage } from '../Models/IPackage';

@Injectable({
  providedIn: 'root'
})
export class SellerRegistrationService {

  constructor(private http: HttpClient) { }

  markRequirementAsViewed(id) {
    return this.http.put(environment.baseUrl + `seller/requirement-views/${id}`, {}).toPromise();
  }
  getPackages(): any {
    return this.http.get(environment.baseUrl + `packages`, {}).toPromise();

  }

  postCar(body) {
    return this.http.post(environment.baseUrl + 'seller/post-car',
      body
    ).toPromise();
  }
  updateCar(id, body) {
    return this.http.put(environment.baseUrl + `seller/post-car/${id}`,
      body
    ).toPromise();
  }
  getDataPackage(registration) {
    return this.http.get(
      `https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleData?v=2&api_nullitems=1&auth_apikey=4672b3d6-fb95-415d-8855-8583aab51abc&user_tag=&key_VIN=${registration}`
      // `https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleTaxData?v=2&api_nullitems=1&auth_apikey=4672b3d6-fb95-415d-8855-8583aab51abc&key_VRM=${registration}`
    ).toPromise();
  }
  getAllPostedCar(): any {
    return this.http.get(environment.baseUrl + 'seller/post-car'
    ).toPromise();
  }

  deletePostedCar(id) {
    return this.http.delete(environment.baseUrl + `seller/post-car/${id}`).toPromise();
  }
  getVehicleById(id) {
    return this.http.get(environment.baseUrl + `seller/post-car/${id}`).toPromise();
  }
  getSellers() {
    return this.http.get(environment.baseUrl + `admin/sellers`).toPromise();
  }
  getAllSubmitedOffer(): any {
    return this.http.get(environment.baseUrl + `seller/submit-offer`).toPromise();
  }
  getAllSellerRequirements(): any {
    return this.http.get(environment.baseUrl + `seller/find-requirements`).toPromise();
  }
  submitOffer(body) {
    return this.http.post(environment.baseUrl + `seller/submit-offer`, body).toPromise();
  }
  validateRegistrationNo(registration) {
    return this.http.get(environment.baseUrl + `seller/validate-registration/${registration}`).toPromise();
  }
  deletePostedCarImage(id) {
    return this.http.delete(environment.baseUrl + `seller/images/${id}`).toPromise();
  }

  // seller/representative
  getSellerRepresentative() {
    return this.http.get(environment.baseUrl + `seller/representative`).toPromise();
  }
  addSellerRepresentative(body) {
    return this.http.post(environment.baseUrl + `seller/representative`, body).toPromise();
  }
  deleteRepresentative(id) {
    return this.http.delete(environment.baseUrl + `seller/representative/${id}`).toPromise();
  }

  // seller/trial-expiry
  checkTrialExpiry() {
    return this.http.get(environment.baseUrl + `seller/trial-expiry`).toPromise();
  }
}
