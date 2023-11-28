import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API_URls from 'src/app/app-constance/API_URLs';
import baserUrl from 'src/app/helper/baserUrl';

@Injectable({
  providedIn: 'root'
})
export class DashboardHelperService {


  constructor(private _http: HttpClient) { }

  public loadDashboard() {
    return this._http.get(`${baserUrl}` + API_URls.NAVBAR.DASHBOARD);
  }
}
