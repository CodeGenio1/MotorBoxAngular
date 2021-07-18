import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPostRequirement } from '../Models/IPostRequirement';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private http: HttpClient) { }

  PostRequirement(body: IPostRequirement) {
    return this.http.post(environment.baseUrl + 'buyer/post-requirement',
      body
    ).toPromise();
  }

  getAllRequirements() {
    return this.http.get(environment.baseUrl + 'buyer/post-requirement'
    ).toPromise();
  }
  getRequirementById(id) {
    return this.http.get(environment.baseUrl + `buyer/post-requirement/${id}`).toPromise();
  }
  UpdateRequirement(id, body) {
    return this.http.put(environment.baseUrl + `buyer/post-requirement/${id}`, body).toPromise();
  }

  deleteRequirement(id) {
    return this.http.delete(environment.baseUrl + `buyer/post-requirement/${id}`).toPromise();
  }
  vehicleVerification(registration) {
    return this.http.get(`https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleTaxData?v=2&api_nullitems=1&auth_apikey=4672b3d6-fb95-415d-8855-8583aab51abc&key_VRM=${registration}`).toPromise();
  }

  // buyer/received-offer
getOfferReceived(){
  return this.http.get(environment.baseUrl + `buyer/received-offer`).toPromise();
}
}
