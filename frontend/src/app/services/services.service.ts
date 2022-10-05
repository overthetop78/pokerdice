import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from './interfaces/i-login';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  login(data: ILogin) {
    return this.http.post('http://localhost:3000/auth/login', data);
  }

  register(data: ILogin) {
    return this.http.post('http://localhost:3000/auth/register', data);
  }

  getUser(email: string) {
    return this.http.get(`http://localhost:3000/user/email/${email}`);
  }

}
