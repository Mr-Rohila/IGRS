import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API_URls from 'src/app/app-constance/API_URLs';
import baserUrl from 'src/app/helper/baserUrl';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor(private _http: HttpClient) { }
  public loadDistrictList() {
    return this._http.get(`${baserUrl}` + API_URls.DEED.LOAD_DISTRICT);
  }

  public loadSubDistrictList(district: string) {
    return this._http.get(`${baserUrl}` + API_URls.DEED.LOAD_SUB_DISTRICT + "?district=" + district);
  }

  public loadUserList() {
    return this._http.get('/assets/json/users.json');
  }

}
