import { Component, OnInit } from '@angular/core';
import { SearchQueryService } from '../../services/search-query.service';
import { ValidatorService } from 'src/app/Utils/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-query',
  templateUrl: './search-query.component.html',
  styleUrls: ['./search-query.component.css']
})
export class SearchQueryComponent implements OnInit {

  constructor(private _searchQueryService: SearchQueryService, private _validatorService: ValidatorService) { }

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
    var isValidate = this._validatorService.nonEmptyString(this.queryId);
    if (!isValidate) {
      Swal.fire('', 'Please enter valid Complaint Id', 'warning');
      return;
    }
    this._searchQueryService.searchComplaint(this.queryId).subscribe(
      {
        next: (response: any) => {
          if (response?.length > 0) {
            this.queryResponse = response[0];
          }
          else {
            Swal.fire('', 'Data not found ', 'info');
          }
        },
        error: error => {
          console.log(error)
          Swal.fire('', 'Data not found ', 'info');
        }
      }
    );
    return false;
  }
}
