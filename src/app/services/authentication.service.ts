import { ISignup } from './../Models/ISignup';
import { environment } from './../../environments/environment.prod';
import { ILogin } from './../Models/ILogin';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(data: ILogin) {
    const body = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)
      .set('grant_type', 'password');

    return this.http.post(environment.loginUrl,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).toPromise();
  }

  signUp(body: ISignup) {
    return this.http.post(environment.baseUrl + 'account/register',
      body
    ).toPromise();
  }
  forget(body: string) {
    const email = {
      email: body
    };
    return this.http.post(environment.baseUrl + 'user/forgot-password',
      email
    ).toPromise();
  }

  test() {
    return this.http.get('https://jsonplaceholder.typicode.com/albums'
    );
  }
}
