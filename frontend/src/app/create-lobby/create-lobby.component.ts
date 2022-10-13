import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { ILobby } from '../services/interfaces/i-lobby';
import { IUser, UserRole } from '../services/interfaces/i-user';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './create-lobby.component.html',
  styleUrls: ['./create-lobby.component.css']
})
export class CreateLobbyComponent implements OnInit {

  createLobbyForm = this.fb.group({
    lobbyName: ['', [Validators.required, Validators.minLength(3)]],
    lobbyPassword: ['', [Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
  });

  user: IUser = {
    username: '',
    email: '',
    password: '',
    role: UserRole.USER,
    birthday: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 0
  }

  constructor(private fb: FormBuilder, private service: ServicesService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (localStorage.getItem('email') != null) {
      this.GetUser(localStorage.getItem('email') || '');
    }
  }


  GetUser(email: string): IUser {
    this.service.getUser(email).toPromise().then(async (res: any) => {
      this.user = await res;
    });
    return this.user;
  }

  async onSubmit() {
    let lobby = {
      name: this.createLobbyForm.value.lobbyName,
      password: this.createLobbyForm.value.lobbyPassword || null,
      owner: this.user
    }
    this.service.createLobby(lobby).toPromise().then((res: any) => {
      console.log(res);

      if (res != null) {
        this.createLobbyForm.reset();
        //this.router.navigate(['/lobby', res.id]);
        this.dialog.open(DialogComponent,
          {
            data: {
              title: 'Lobby created',
              message: 'Your lobby has been created successfully',
              button: 'Ok'
            }
          });
      }
      else {
        this.dialog.open(DialogComponent,
          {
            data: {
              title: 'Error',
              message: 'An error occured while creating your lobby',
              button: 'Ok'
            }
          });
      }
    });
  }

}
