import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from 'src/app/helper/baserUrl';
import API_URls from 'src/app/app-constance/API_URLs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _http: HttpClient) { }

  changePassword(oldPassword: string, newPassword: string, confirmPassword: string) {

    return this._http.post(`${baserUrl}` + API_URls.ACCOUNT.CHANGE_PASSWORD, null, {

    })
  }
}
