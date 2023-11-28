import { Injectable } from '@angular/core';
import { Users } from '../shared/model/Users';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  setToken(authorization: string) {
    localStorage.setItem("authorization", authorization);
  }

  getToken(): string | null {
    return localStorage.getItem("authorization");
  }

  logout() {
    localStorage.clear();
  }

  setDefaultLanguage(languageCode: string) {
    localStorage.setItem("lang", languageCode);
  }

  getDefaultLanguage(): string {
    var lang = localStorage.getItem("lang");
    return lang == null ? 'en' : lang;
  }

  setCurrentUser(user: Users) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  getCurrentUser(): Users | null {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser != null)
      return JSON.parse(currentUser);

    else {
      // var guest: Users = {
      //   id: 0,
      //   username: 'GUEST',
      //   roles: [Roles.GUEST]
      // }
      // return guest;
      return null;
    }
  }

  public isUserLogin(): boolean {
    return this.getCurrentUser() != null;
  }
}
