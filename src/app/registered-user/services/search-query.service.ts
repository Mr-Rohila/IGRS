import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchQueryService {

  constructor(private _http:HttpClient) { }


  searchComplaint(queryId: string) {
    return this._http.get('https://jsonplaceholder.typicode.com/posts/1');
  }
  
}
