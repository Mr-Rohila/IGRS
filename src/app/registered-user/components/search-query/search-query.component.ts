import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-query',
  templateUrl: './search-query.component.html',
  styleUrls: ['./search-query.component.css']
})
export class SearchQueryComponent implements OnInit {

  constructor() { }

  queryId = "";
  queryResponse = {
    "id": "QRA140920230001",
    "type": "Payment Refund",
    "initDate": '12-07-2023',
    "updateDate": '18-07-2023',
    "ststus": "Solved",
    "comment": "Query solved and refund ininitiated from our side. Please wait 3 days for refund",
  };

  ngOnInit(): void {
  }

  onSubmit() {
    alert(this.queryId);
    return false;
  }
}
