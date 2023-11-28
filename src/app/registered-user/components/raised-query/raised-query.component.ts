import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SearchDeedService } from '../../services/search-deed.service';
import { PaymentRelatedQuery } from 'src/app/shared/model/PaymentRelatedQuery';
import { RaisedQueryService } from '../../services/raised-query.service';
import { DocuemntNotFoundQuery } from 'src/app/shared/model/DocumentNotFoundQuery'; 
import { DetailMismatchQuery } from 'src/app/shared/model/DetailMismatchQuery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-raised-query',
  templateUrl: './raised-query.component.html',
  styleUrls: ['./raised-query.component.css']
})
export class RaisedQueryComponent implements OnInit {

  paymentQuery: PaymentRelatedQuery = new PaymentRelatedQuery();

  doucmentNotFoundQuery:DocuemntNotFoundQuery= new DocuemntNotFoundQuery();

  detailMismatchQuery:DetailMismatchQuery=new DetailMismatchQuery();




  userLang: string;
  constructor(private _searchDeedService: SearchDeedService, private _local: LocalStorageService, private _raisedQueryService:RaisedQueryService) {
    this.userLang = _local.getDefaultLanguage();

  }

  queryTypeResponseList: any = [];
  selectedQueryType: string = "Select";
    paymentId: string ;
    paymentDate: string;
    explanation: string;

  selectedDistrictId: string = "Select";
  districtList: any[] = [];
  villageList: any[] = [];
  ngOnInit(): void {
    var d1 = {
      "sno": 1,
      "english": "Payment Related",
    }
    this.queryTypeResponseList.push(d1);

    var d2 = {
      "sno": 2,
      "english": "Document Not found",
    }
    this.queryTypeResponseList.push(d2);

    var d3 = {
      "sno": 3,
      "english": "Details mismatch",
    }
    this.queryTypeResponseList.push(d3);

    var d5 = {
      "sno": 5,
      "english": "Other",
    }
    this.queryTypeResponseList.push(d5);

    this.loadDistrictList();
  }

  onQueryTypeChange(event: any) {
    this.selectedQueryType = event.target.value;
  }

  loadDistrictList() {
    this._searchDeedService.loadDistrictList().subscribe(
      {
        next: (response: any) => {
          if (response?.length > 0) {
            this.districtList = response;
          }
          else {
            Swal.fire('', 'Something Wrong ! try After some time', 'error');
          }
        },
        error: (error) => {
          Swal.fire('', 'Something Wrong ! try After some time', 'error');
          console.log(error);
        }
      }
    );
  }


  onDistrictChange() {
    // load village
    this.loadVillage(this.doucmentNotFoundQuery.districtId);
  }


  loadVillage(districtId: string) {
    this.villageList = [];
    if (districtId == "Select" || districtId == "")
      return;
    this._searchDeedService.loadVillage(districtId).subscribe({
      next: (response: any) => {
        this.villageList = response;
      },
      error: (error) => {
        console.log(error);
        Swal.fire('', 'Village not found !', 'error');
      }
    });
  }

  onPaymentRelatedSubmit() {

   console.log(this.paymentQuery.paymentId);
   /* this._raisedQueryService.savePaymentRelateQuery(this.paymentQuery).subscribe((response: any) =>{
    (response: any) => {
      // Handle the response from the backend
      this.responseMessage = response;
      console.log('Backend response:', response);
    },
    (error) => {
      // Handle errors from the backend
      console.error('Error:', error);
    }

   })
 */
   this._raisedQueryService.savePaymentRefundComplaint(this.paymentQuery).subscribe(
    (response: any) => {
      // Handle the response from the backend
      
      console.log('Backend response:', response);
    },
    (error) => {
      // Handle errors from the backend
      console.error('Error:', error);
    }
  );


  }

  onDocumentNotFoundSubmit() { 
    this._raisedQueryService.saveDocumentNotFoundComplaint(this.doucmentNotFoundQuery).subscribe(
      (response: any) => {
        // Handle the response from the backend
        
        console.log('Backend response:', response);
      },
      (error) => {
        // Handle errors from the backend
        console.error('Error:', error);
      }
    );
  }

  onDetailsMissmatchSubmit() {
    this._raisedQueryService.saveDetailMismatchComplaint(this.detailMismatchQuery).subscribe(
      (response: any) => {
        // Handle the response from the backend
        console.log('Backend response:', response);
      },
      (error) => {
        // Handle errors from the backend
        console.error('Error:', error);
      }
    );
  }
}
