import { Component, OnInit } from '@angular/core';
import { SearchQueryService } from '../../services/search-query.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-query',
  templateUrl: './search-query.component.html',
  styleUrls: ['./search-query.component.css']
})
export class SearchQueryComponent implements OnInit {

  constructor(private _searchQueryService: SearchQueryService) { }

  queryResponse: any = [];
  selectedQuery: any;
  ngOnInit(): void {
    this.loadQuery();
  }

  loadQuery() {
    this._searchQueryService.getAllQueries().subscribe({
      next: (res: any) => {
        this.queryResponse = res;
      },
      error: (err) => {
        console.log(err);
        Swal.fire('Faield', 'Something wrong, try after some time', 'error');
      }
    })
  }
}
