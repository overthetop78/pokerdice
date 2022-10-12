import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from './interfaces/i-login';
import { UrlBackend } from './interfaces/url-backend';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  login(data: ILogin) {
    return this.http.post(`${UrlBackend.URL_BACKEND}/auth/login`, data);
  }

  register(data: ILogin) {
    return this.http.post(`${UrlBackend.URL_BACKEND}/user`, data);
  }

  getUser(email: string) {
    return this.http.get(`${UrlBackend.URL_BACKEND}/user/email/${email}`);
  }

  getLobbies() {
    return this.http.get(`${UrlBackend.URL_BACKEND}/lobby`);
  }

}
