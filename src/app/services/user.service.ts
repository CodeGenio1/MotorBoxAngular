import { environment } from './../../environments/environment.prod';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  loginUser(userObj: any) {
    this.saveToken(userObj.access_token);
    this.saveRefreshToken(userObj.refresh_token);
  }

  logoutUser() {
    localStorage.clear();
  }

  getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  getToken(): string {
    return localStorage.getItem(ACCESS_TOKEN);
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
}



