import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IPostRequirement } from '../Models/IPostRequirement';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private http: HttpClient) { }

  PostRequirement(body: IPostRequirement) {
    return this.http.post(environment.baseUrl +'buyer/post-requirement',
      body
    ).toPromise();
  }

}
