import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private api_url= environment.API_URL;
  private now=environment.NOW_PAYMENTS
  private apiKey = environment.API_KEY;

  // header:any=new HttpHeaders({'x-api-key':this.apiKey,'Content-Type':'application/json'})

  constructor(private http:HttpClient) { }

  getCurrencies(){
    const url = `${this.api_url}coins`;//merchant/coins
    return this.http.get<any>(url);
  }

  getMinimumPaymentAmount(data:any){//&currency_to=${c_to}&fiat_equivalent=usd//min-amount?currency_from=eth&currency_to=trx&fiat_equivalent=usd&is_fixed_rate=False&is_fee_paid_by_user=False
    return this.http.post(`${this.api_url}min-amount`,data);
    // min-amount?currency_from=${c_from}&is_fee_paid_by_user=true`,{headers:this.header});
  }
  // getEstimatePrice(amount:any,c_from:any){
  //   return this.http.get(`${this.now}estimate?amount=${amount}&currency_from=${c_from}&currency_to=btc`,{headers:this.header});
  // }

  createPayment(data:any){
    return this.http.post(`${this.api_url}payment`,data);
  }

  createPaymentInvoice(data:any){
    return this.http.post(`${this.api_url}invoice`,data);
  }

  // getPaymentStatus(payment_id:any){
  //   return this.http.post(`${this.api_url}payment_status`,payment_id);
  // }
  getPaymentStatus(payment_id:number){
    return this.http.get(`${this.now}payment/${payment_id}`);
  }

  // send data to payment page
  private paymentStatusData = new BehaviorSubject<string>('');

  // sending data
  sendData(data: string): void {
    this.paymentStatusData.next(data);
  }

  // receiving data
  getData(): BehaviorSubject<string> {
    return this.paymentStatusData;
  }

    // send data to payment page
    private paymentMessageData = new BehaviorSubject<string>('');

    // sending data
    sendPaymentMessageData(data: string): void {
      this.paymentMessageData.next(data);
    }
  
    // receiving data
    getPaymentMessageData(): BehaviorSubject<string> {
      return this.paymentMessageData;
    }
  
}
