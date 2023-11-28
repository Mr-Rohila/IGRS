import { Component, OnInit, HostListener } from '@angular/core';
import { SearchDeedService } from '../../services/search-deed.service';
import { CoreBaseTemplateComponent } from 'src/app/core/components/core-base-template/core-base-template.component';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { PaymentService } from 'src/app/services/payment.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var Razorpay: any;

@Component({
  selector: 'app-search-deed',
  templateUrl: './search-deed.component.html',
  styleUrls: ['./search-deed.component.css']
})
export class SearchDeedComponent implements OnInit {

  userLang: string;
  username: string;
  constructor(private _local: LocalStorageService, private _translateService: TranslateService, private _searchDeedService: SearchDeedService, private _paymentService: PaymentService, private _domSanitizer: DomSanitizer) {
    this.userLang = _local.getDefaultLanguage();
    this.username = _local.getCurrentUser()?.username + "";
  }

  searchType = "By Owner Name";
  ownerNameList: any[] = [];
  selectedFileId: any;
  selectedDeedInformation: any;
  paymentInitSuccess = false;
  dataLocalUrl: SafeResourceUrl | null;


  options = {
    "key": "",
    "amount": "",
    "name": "IGRS",
    "description": "Deed Download",
    "image": "",
    "order_id": "",
    "handler": function (response) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };
  ngOnInit(): void {
    CoreBaseTemplateComponent.urlTrace.next([{ name: "Dashboard", url: "/user/dashboard" }, { name: "Search Deed", url: "/user/register/create-new-request" }])
  }

  onSearchTypeChange() {
    this.ownerNameList = []
    this.paymentInitSuccess = false;
    this.selectedDeedInformation = null;
    this.selectedFileId = null;
    this.dataLocalUrl = null;
  }
  loadOwnerList(list: any) {
    //reset changes
    this.onSearchTypeChange();

    //data recived from child component
    this.ownerNameList = list

  }

  onOwnerNameChange(event: any) {
    this.paymentInitSuccess = false;
    //feath other data
    this._searchDeedService.loadDeedInformation(this.selectedFileId[0]).subscribe({
      next: (data: any) => {
        this.selectedDeedInformation = data;
      }, error: (error: any) => {
        Swal.fire("", "Data Not found", "info");
        console.log(error);
      }
    });
  }


  previewDeed() {
    this._searchDeedService.previewDeed(this.selectedFileId[0]).subscribe({
      next: (data: any) => {
        var pdfFile = new Blob([data], { type: 'application/pdf' });
        //create URL 
        this.dataLocalUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(pdfFile) + '#toolbar=0');
        console.log(data);
      }, error: (error: any) => {
        Swal.fire("", "Data Not found", "info");
        console.log(error);
      }
    });
  }

  paymentDetails() {
    this.paymentInitSuccess = false;
    // show infomation related to payment
    Swal.fire({
      title: 'Payment',
      icon: 'info',
      text: 'Do you went to pay and download the deed?',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Yes',
    }).then(result => {
      if (result.isConfirmed) {
        //init payment
        //show payment details
        this.paymentInitSuccess = true;
      }
    })
  }
  paymentInit() {
    var _this = this;
    //create order 
    var order = {
      "fileId": this.selectedFileId[0],
      "amount": "20000"
    }
    this._paymentService.createOrder(order).subscribe({
      next: (data: any) => {
        console.log(data);
        //create order success
        //set option for payment
        this.options.key = 'rzp_test_1JyuxZSAN2TzS2';
        this.options.order_id = data.txId;
        this.options.amount = data.txAmount; //paise
        this.options.prefill.contact = this.username;
        var rzp1 = new Razorpay(this.options);
        rzp1.open();

        rzp1.on('payment.failed', function (response) {
          // Todo - store this information in the server
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          _this.onFailedPayment(response);

        });

      }, error: (error: any) => {
        console.log(error);
        alert('order create failed')
      }
    });
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    console.log(event.detail);
    var paymentId = event.detail.razorpay_payment_id;
    var orderId = event.detail.razorpay_order_id;
    var signature = event.detail.razorpay_signature;
    //check payment status on server
    this._paymentService.updateOrder(event.detail, "success").subscribe();
    //forword to download deed 
    //future download redirect the show previous
  }

  onFailedPayment(response) {
    alert('payment failed');
    this._paymentService.updateOrder({
      "razorpay_order_id": response.error.metadata.order_id,
      "razorpay_payment_id": response.error.metadata.payment_id,
      "razorpay_signature": response.error.metadata.signature,
    }, "failed").subscribe();
  }

  //check payment status in razorpay server

}