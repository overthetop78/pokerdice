import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, UserRole } from '../services/interfaces/i-user';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: ServicesService, private router: Router) { }

  isConnected = false;
  user: IUser = {
    username: '',
    email: '',
    password: '',
    role: UserRole.USER,
    birthday: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 0
  };

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  ngOnInit(): void {
    if (localStorage.getItem('access-token')) {
      this.isConnected = true;
      let email = localStorage.getItem('email')
      if (email != null)
        this.GetUser(email)
    }
  }

  Login() {
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('access-token', res.access_token);
      localStorage.setItem('email', res.email);
      this.isConnected = true;
      this.user = this.GetUser(res.email);
    }
    );
  }

  Register() {
    this.router.navigate(['register'])
  }

  GetUser(email: string): IUser {
    this.service.getUser(email).toPromise().then(async (res: any) => {
      this.user = await res;
    });
    return this.user;
  }

  disconnect() {
    localStorage.removeItem('access-token')
    localStorage.removeItem('email')
    this.isConnected = false;
    this.router.navigate(['home'])
  }
}
