import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControlName, Form, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { UserRole } from '../services/interfaces/i-user';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}')]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6), this.checkPassword(), Validators.maxLength(20), Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}')]],
    birthday: ['', [Validators.required]],

  });
  ageMax: Date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18);

  constructor(private fb: FormBuilder, private service: ServicesService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid) {
      let data = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        birthday: this.registerForm.value.birthday,
        role: UserRole.USER,
      }
      this.service.register(this.registerForm.value).subscribe(
        (res) => {
          console.log(res);
        }
      )
      this.router.navigate(['/home']);
      const dialogRef = this.openDialog();
    }
  }

  checkPassword() {
    return (control: FormControlName) => {
      const password = control.value.password;
      return password && control.value !== password.value ? { notSame: true } : null;
    }
  }

  openDialog() {
    this.dialog.open(
      DialogComponent,
      {
        data: {
          title: 'Register',
          subtitle: '',
          message: 'You have been registered successfully',
          button: 'OK'
        }
      }
    );
  }

}
