import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API_URls from '../app-constance/API_URLs';
import baserUrl from '../helper/baserUrl';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  
  constructor(private _http: HttpClient) { }

  public loadNavBar() {
    return this._http.get(`${baserUrl}`+API_URls.NAVBAR.DEFAULT)
  }
}
