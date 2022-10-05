import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IUser, UserRole } from '../services/interfaces/i-user';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: ServicesService) { }

  isConnected = false;
  user: IUser = {
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
    console.log(this.loginForm.value);
  }

  GetUser(email: string): IUser {
    this.service.getUser(email).toPromise().then(async (res: any) => {
      console.log(res);
      this.user = await res;
      console.log("user", this.user);

    });
    return this.user;
  }
}
