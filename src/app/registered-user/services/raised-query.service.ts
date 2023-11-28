import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentRelatedQuery } from 'src/app/shared/model/PaymentRelatedQuery';
import { DocuemntNotFoundQuery } from 'src/app/shared/model/DocumentNotFoundQuery'; 
import { DetailMismatchQuery } from 'src/app/shared/model/DetailMismatchQuery';
import API_URls from 'src/app/app-constance/API_URLs';
import baserUrl from 'src/app/helper/baserUrl';

@Injectable({
  providedIn: 'root'
})
export class RaisedQueryService {

  constructor(private _http: HttpClient) { }


  public savePaymentRefundComplaint(paymentRefundAccessBean: PaymentRelatedQuery){
    return this._http.post(`${baserUrl}` + API_URls.RAISED_QUERY.SAVE_PAYMENT_REFUND_REQUEST, paymentRefundAccessBean);
  }

  public saveDocumentNotFoundComplaint(doucmentNotFoundQuery:DocuemntNotFoundQuery){
    return this._http.post(`${baserUrl}` + API_URls.RAISED_QUERY.SAVE_DOCUMENT_NOT_FOUND_REQUEST, doucmentNotFoundQuery);
  }


  public saveDetailMismatchComplaint(detailMismatchQuery:DetailMismatchQuery){
    return this._http.post(`${baserUrl}` + API_URls.RAISED_QUERY.SAVE_DETAIL_MISMATCH_REQUEST, detailMismatchQuery);
  }

}
