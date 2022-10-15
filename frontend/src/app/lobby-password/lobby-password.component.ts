import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lobby-password',
  templateUrl: './lobby-password.component.html',
  styleUrls: ['./lobby-password.component.css']
})
export class LobbyPasswordComponent implements OnInit {
  lobbyId: number = 0;
  lobbyPassword: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  checkPasswordForm = this.fb.group({
    lobbyPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
  });

  ngOnInit(): void {
    this.lobbyId = this.data.lobbyId;
    this.lobbyPassword = this.data.lobbyPassword;
    console.log(this.lobbyId, this.lobbyPassword);

  }

  checkPassword() {
    if (this.checkPasswordForm.valid) {
      console.log(this.checkPasswordForm.value.lobbyPassword);

      if (this.checkPasswordForm.value.lobbyPassword === this.lobbyPassword) {
        console.log('password correct');

        this.router.navigate(['lobby', { data: this.lobbyId }]);
      }
    }
  }

}
