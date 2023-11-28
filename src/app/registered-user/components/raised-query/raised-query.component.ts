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

  doucmentNotFoundQuery: DocuemntNotFoundQuery = new DocuemntNotFoundQuery();

  detailMismatchQuery: DetailMismatchQuery = new DetailMismatchQuery();




  userLang: string;
  constructor(private _searchDeedService: SearchDeedService, private _local: LocalStorageService, private _raisedQueryService: RaisedQueryService) {
    this.userLang = _local.getDefaultLanguage();

  }

  queryTypeResponseList: any = [];
  selectedQueryType: string = "Select";
  paymentId: string;
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
    //validating payment refund form data 
    var flag = this.validataPaymentFormData();
    if (!flag)
      return;
    this._raisedQueryService.savePaymentRefundComplaint(this.paymentQuery).subscribe(
      (response: any) => {
        this.showSuccessMessage();
      },
      (error) => {
        // Handle errors from the backend
        console.error('Error:', error);
      }
    );
  }

  onDocumentNotFoundSubmit() {
    var flag = this.validateDocumentNotFoundFormData();
    if (!flag)
      return;
    this._raisedQueryService.saveDocumentNotFoundComplaint(this.doucmentNotFoundQuery).subscribe(
      (response: any) => {
        this.showSuccessMessage();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onDetailsMissmatchSubmit() {
    var flag=this.validateDetailMismatchFormData();
    if (!flag)
    return;

    this._raisedQueryService.saveDetailMismatchComplaint(this.detailMismatchQuery).subscribe(
      (response: any) => {
        this.showSuccessMessage();
      },
      (error) => {
        // Handle errors from the backend
        console.error('Error:', error);
      }
    );
  }



  validataPaymentFormData(): boolean {
    if (this.paymentQuery.paymentId == undefined || this.paymentQuery.paymentId == '' || this.paymentQuery.paymentId == ',') {
      $("[name='paymentId']").focus();
      return this.showEmptyColumnMessage('Payment Id.');
    } else if (this.paymentQuery.paymentDate == undefined) {
      $("[name='paymentDate']").focus();
      return this.showEmptyColumnMessage('Payment Date.');
    } else if (this.paymentQuery.explanation == undefined || this.paymentQuery.explanation == '' || this.paymentQuery.explanation == ',') {
      $("[name='explanation']").focus();
      return this.showEmptyColumnMessage('Explanation.');
    } else if (this.paymentQuery.mobileNumber == undefined || this.paymentQuery.mobileNumber == '' || this.paymentQuery.mobileNumber == ',') {
      $("[name='mobileNumber']").focus();
      return this.showEmptyColumnMessage('mobileNumber.');
    } else if (this.paymentQuery.address == undefined || this.paymentQuery.address == '' || this.paymentQuery.address == ',') {
      $("[name='address']").focus();
      return this.showEmptyColumnMessage('Address.');
    } else if (this.paymentQuery.contactPersonName == undefined || this.paymentQuery.contactPersonName == '' || this.paymentQuery.contactPersonName == ',') {
      $("[name='contactPersonName']").focus();
      return this.showEmptyColumnMessage('contactPersonName.');
    } else if (this.paymentQuery.fathername == undefined || this.paymentQuery.fathername == '' || this.paymentQuery.fathername == ',') {
      $("[name='fathername']").focus();
      return this.showEmptyColumnMessage('fathername.');
    } else
      return true;
  }

  validateDocumentNotFoundFormData(): boolean {
    if (this.doucmentNotFoundQuery.districtId == undefined || this.doucmentNotFoundQuery.districtId == '' || this.doucmentNotFoundQuery.districtId == ',') {
       $("[name='districtId']").focus();
      return this.showEmptyColumnMessage('District ');
    } else if (this.doucmentNotFoundQuery.villageId == undefined || this.doucmentNotFoundQuery.villageId == '' || this.doucmentNotFoundQuery.villageId == ',') {
      $("[name='villageId']").focus();
      return this.showEmptyColumnMessage('Village Name.');
    } else if (this.doucmentNotFoundQuery.ownerName == undefined || this.doucmentNotFoundQuery.ownerName == '' || this.doucmentNotFoundQuery.ownerName == ',') {
      $("[name='ownerName']").focus();
      return this.showEmptyColumnMessage('ownerName.');
    } else if (this.doucmentNotFoundQuery.ownerRelativeName == undefined || this.doucmentNotFoundQuery.ownerRelativeName == '' || this.doucmentNotFoundQuery.ownerRelativeName == ',') {
      $("[name='ownerRelativeName']").focus();
      return this.showEmptyColumnMessage('ownerRelativeName.');
    } else if (this.doucmentNotFoundQuery.villageId == undefined || this.doucmentNotFoundQuery.villageId == '' || this.doucmentNotFoundQuery.villageId == ',') {
      $("[name='villageId']").focus();
      return this.showEmptyColumnMessage('villageId.');
    } else if (this.doucmentNotFoundQuery.explanation == undefined || this.doucmentNotFoundQuery.explanation == '' || this.doucmentNotFoundQuery.explanation == ',') {
      $("[name='explanation']").focus();
      return this.showEmptyColumnMessage('Other  Details Related to Document .');
    } else if (this.doucmentNotFoundQuery.mobileNumber == undefined || this.doucmentNotFoundQuery.mobileNumber == '' || this.doucmentNotFoundQuery.mobileNumber == ',') {
      $("[name='mobileNumber']").focus();
      return this.showEmptyColumnMessage('mobileNumber.');
    } else if (this.doucmentNotFoundQuery.address == undefined || this.doucmentNotFoundQuery.address == '' || this.doucmentNotFoundQuery.address == ',') {
      $("[name='address']").focus();
      return this.showEmptyColumnMessage('Address.');
    } else if (this.doucmentNotFoundQuery.contactPersonName == undefined || this.doucmentNotFoundQuery.contactPersonName == '' || this.doucmentNotFoundQuery.contactPersonName == ',') {
      $("[name='contactPersonName']").focus();
      return this.showEmptyColumnMessage('contactPersonName.');
    } else if (this.doucmentNotFoundQuery.fathername == undefined || this.doucmentNotFoundQuery.fathername == '' || this.doucmentNotFoundQuery.fathername == ',') {
      $("[name='fathername']").focus();
      return this.showEmptyColumnMessage('fathername.');
    }
    return true;
  }


  validateDetailMismatchFormData():boolean{
    if (this.detailMismatchQuery.documentId == undefined || this.detailMismatchQuery.documentId == '' || this.detailMismatchQuery.documentId == ',') {
      $("[name='documentId']").focus();
      return this.showEmptyColumnMessage('Document');
    } else if (this.detailMismatchQuery.explanation == undefined || this.detailMismatchQuery.explanation == '' || this.detailMismatchQuery.explanation == ',') {
      $("[name='explanation']").focus();
      return this.showEmptyColumnMessage('Explanation.');
    } else if (this.detailMismatchQuery.mobileNumber == undefined || this.detailMismatchQuery.mobileNumber == '' || this.detailMismatchQuery.mobileNumber == ',') {
      $("[name='mobileNumber']").focus();
      return this.showEmptyColumnMessage('mobileNumber.');
    } else if (this.detailMismatchQuery.address == undefined || this.detailMismatchQuery.address == '' || this.detailMismatchQuery.address == ',') {
      $("[name='address']").focus();
      return this.showEmptyColumnMessage('Address.');
    } else if (this.detailMismatchQuery.contactPersonName == undefined || this.detailMismatchQuery.contactPersonName == '' || this.detailMismatchQuery.contactPersonName == ',') {
      $("[name='contactPersonName']").focus();
      return this.showEmptyColumnMessage('contactPersonName.');
    } else if (this.detailMismatchQuery.fathername == undefined || this.detailMismatchQuery.fathername == '' || this.detailMismatchQuery.fathername == ',') {
      $("[name='fathername']").focus();
      return this.showEmptyColumnMessage('fathername.');
    }
    return true;
  }


  showEmptyColumnMessage(columnName: string): boolean {
    Swal.fire('Empty Column', columnName + " can't be empty !", 'info');
    return false;
  }


  private showSuccessMessage(): void {
    Swal.fire({
      title: 'Success',
      text: 'Save Successfully!',
      icon: 'success',
      showConfirmButton: false,
      timer: 2500
    }).then(() => {
      location.reload();
    });
  }
}
