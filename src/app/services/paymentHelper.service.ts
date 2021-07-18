import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class PaymentHelperService {
  private _disable = new Subject<any>();

  constructor(private http: HttpClient) {
    this._disable.asObservable();
  }

  public setDisable(val) {
    this._disable.next(val);
  }
  public getDisable(){
    return this._disable;
  }
}
