import { environment } from './../../environments/environment';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { isNullOrUndefined } from 'util';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const IS_TRAIL_EXP = 'isTrialExp'
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loginUser(userObj: any) {
    this.saveToken(userObj.access_token);
    this.saveRefreshToken(userObj.refresh_token);
  }

  logoutUser() {
    localStorage.clear();
  }

  getUser(): any {
    const user = this.getToken();
    if (user) {
      return jwt_decode(user);
    }
    return null;
  }
  getUserFullname(): any {
    let users: any;
    const user = this.getToken();
    if (user) {
      users = jwt_decode(user);
      return users.user;
    }
    return null;
  }
  getToken(): string {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      return token;
    } else {
      return null;

    }
  }

  getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  saveToken(token): void {
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  saveRefreshToken(refreshToken): void {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  removeToken(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN);
  }


  refreshToken(refresh_token: any): Observable<any> {
    this.removeToken();
    this.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refresh_token)
      .set('grant_type', 'refresh_token');
    return this.http.post<any>(environment.loginUrl, body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.saveToken(res.access_token);
          this.saveRefreshToken(res.refresh_token);
        })

      );
  }

  logout(): void {
    this.removeToken();
    this.removeRefreshToken();
  }
  getUserById(id) {
    return this.http.get<any>(environment.baseUrl + '/user-info');
  }
  public isLoggedIn() {
    // tslint:disable-next-line: deprecation
    if (!isNullOrUndefined(localStorage.getItem(ACCESS_TOKEN)) && localStorage.getItem(ACCESS_TOKEN) !== '') {
      return true
    } else {
      return false;

    }
  }

  checkBuyerLogin() {
    const user = this.getUser();
    if (user.user.role.find(x => x === "Buyer")) {
      return true;
    } else {
      return false;
    }
  }

  resetPassword(body: any) {
    return this.http.post(environment.baseUrl + `user/reset-password`, body).toPromise();
  }

  trialExpired(res) {
    localStorage.setItem(IS_TRAIL_EXP, res);
  }

  isTrialExpired() {
    return localStorage.getItem(IS_TRAIL_EXP) === 'true' ? true : false;
  }

}



