import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControlName, Form, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
    confirmPassword: [''],
    role: [''],
    birthday: [''],

  });
  ageMax: Date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register() {
    throw new Error('Method not implemented.');
  }

}
