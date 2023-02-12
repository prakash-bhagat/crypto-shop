import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NowPaymnetsService {
  _api=environment.nowpayments;
  _key=environment.api_key;
  constructor(private httpClient:HttpClient) { }

  header:any=new HttpHeaders({'x-api-key':this._key,'Content-Type':'application/json'})
  

  getCheckedCurrenccies(){
    return this.httpClient.get(`${this._api}merchant/coins`,{headers:this.header});
  }
  getMinimumPaymentAmount(c_from:any,c_to:any){
    return this.httpClient.get(`${this._api}min-amount?currency_from=${c_from}&currency_to=${c_to}&fiat_equivalent=usd`,{headers:this.header});
  }
  getEstimatePrice(amount:any,c_from:any){
    return this.httpClient.get(`${this._api}estimate?amount=${amount}&currency_from=${c_from}&currency_to=btc`,{headers:this.header});
  }
  createPaymnet(data:any){
    return this.httpClient.post(`${this._api}payment`,data,{headers:this.header});
  }
  createPaymnetInvoice(data:any){
    return this.httpClient.post(`${this._api}invoice`,data,{headers:this.header});
  }
  invoiceUrl(){
    return this.httpClient.get(`${this._api}payment/?iid=4862014312`,{headers:this.header});
  }
  getPaymentStatus(payment_id:any){
    return this.httpClient.get(`${this._api}payment/${payment_id}`,{headers:this.header});
  }

//   data={
//     "payment_id": "6396647145",
//     "payment_status": "waiting",
//     "pay_address": "3AfX5FAzYsYFHypZ8vfBdLu9ohabQo1hDh",
//     "price_amount": 20,
//     "price_currency": "1inch",
//     "pay_amount": 0.00049525,
//     "amount_received": 0.00043901,
//     "pay_currency": "btc",
//     "order_id": "123",
//     "order_description": "Test Buy",
//     "ipn_callback_url": "https://nowpayments.io",
//     "created_at": "2023-02-08T10:47:56.277Z",
//     "updated_at": "2023-02-08T10:47:56.277Z",
//     "purchase_id": "4314490016",
//     "smart_contract": null,
//     "network": "btc",
//     "network_precision": null,
//     "time_limit": "2023-02-08T11:07:56.209Z",
//     "burning_percent": null,
//     "expiration_estimate_date": "2023-02-08T11:07:56.209Z",
//     "is_fixed_rate": true,
//     "is_fee_paid_by_user": false,
//     "valid_until": "2023-02-08T11:07:56.209Z",
//     "type": "crypto2crypto"
// }
}
