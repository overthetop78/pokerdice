import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lobby-password',
  templateUrl: './lobby-password.component.html',
  styleUrls: ['./lobby-password.component.css']
})
export class LobbyPasswordComponent implements OnInit {
  lobbyId: number = 0;
  lobbyPassword: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  checkPasswordForm = this.fb.group({
    lobbyPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
  });

  ngOnInit(): void {
    this.getData();
    console.log(this.lobbyId, this.lobbyPassword);

  }

  checkPassword() {
    throw new Error('Method not implemented.');
  }

  getData() {
    this.route.params.subscribe(params => {
      this.lobbyId = params['lobbyId'];
      this.lobbyPassword = params['lobbyPassword'];
    }
    );
  }
}
