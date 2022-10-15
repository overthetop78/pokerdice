import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from './interfaces/i-login';
import { UrlBackend } from './interfaces/url-backend';
import { IUser } from './interfaces/i-user';
import { Observable } from 'rxjs';
import { ILobby } from './interfaces/i-lobby';
import { ValidPlay } from './interfaces/i-player';
import { ILobbyUser } from './interfaces/i-lobby-user';

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

  createLobby(lobby: any) {
    return this.http.post(`${UrlBackend.URL_BACKEND}/lobby`, lobby);
  }

  getLobby(lobbyId: number): Observable<ILobby> {
    return this.http.get<ILobby>(`${UrlBackend.URL_BACKEND}/lobby/${lobbyId}`);
  }

  addUserToLobby(user: IUser, res: ILobby) {
    const lobbyUser: ILobbyUser = {
      position: 0,
      tour: 0,
      points: 0,
      win: 0,
      lose: 0,
      draw: 0,
      validPlay: ValidPlay.WAITING_PLAYING,
      lobby: {
        id: res.id
      },
      user: {
        id: user.id
      }
    }
    return this.http.post(`${UrlBackend.URL_BACKEND}/lobby-user`, lobbyUser);
  }

  deleteLobby(lobbyId: number) {
    return this.http.delete(`${UrlBackend.URL_BACKEND}/lobby/${lobbyId}`);
  }

  leaveLobby(lobbyUserId: number) {
    return this.http.delete(`${UrlBackend.URL_BACKEND}/lobby-user/${lobbyUserId}`);
  }

  setPlay(lobbyUserId: number, ValidPlay: ValidPlay) {
    let data = {
      validPlay: ValidPlay
    }
    return this.http.patch(`${UrlBackend.URL_BACKEND}/lobby-user/${lobbyUserId}`, data);
  }

  async startGame(lobbyId: number) {
    return this.http.get(`${UrlBackend.URL_BACKEND}/core/Game/StartGame/${lobbyId}`);
  }

}
