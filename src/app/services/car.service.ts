import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCarsYears() {
    return this.http.get(environment.baseUrl + 'cars-years'
    ).toPromise();
  }
  getMakeAndModel(year) {
    return this.http.get(environment.baseUrl + `cars-data/${year}`
    ).toPromise();
  }
  getCarDetails(id) {
    return this.http.get(environment.baseUrl + `seller/post-car/${id}`
    ).toPromise();
  }

}
