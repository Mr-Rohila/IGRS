import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API_URls from 'src/app/app-constance/API_URLs';
import baserUrl from 'src/app/helper/baserUrl';

@Injectable({
  providedIn: 'root'
})
export class SearchQueryService {

  constructor(private _http: HttpClient) { }


  getAllQueries() {
    return this._http.get(`${baserUrl}` + API_URls.SEARCH_QUERY.GET_ALL_QUERIES);
  }

}
