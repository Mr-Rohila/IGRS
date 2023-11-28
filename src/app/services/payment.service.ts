import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper/baserUrl';
import API_URls from '../app-constance/API_URLs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _http: HttpClient) { }

  createOrder(order: any) {
    return this._http.post(`${baserUrl}` + API_URls.PAYMENT.CREATE_ORDER, order)
  }

  updateOrder(order: any, status: string) {
    var body = {
      txId: order.razorpay_order_id,
      txPaymentId: order.razorpay_payment_id,
      razorpaySignature: order.razorpay_signature,
      txStatus: status
    }
    return this._http.post(`${baserUrl}` + API_URls.PAYMENT.UPDATE_ORDER, body);
  }
}
