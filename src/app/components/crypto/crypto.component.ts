import { Component, OnInit } from '@angular/core';
import { FormControl, MinValidator, Validators } from '@angular/forms';
import { NowPaymnetsService } from 'src/app/service/now-paymnets.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent implements OnInit{

  defaultCoin='BTC'
  loginStatus:boolean=false;
  currenciesList:any;
  estimated_amount:any;
  estimatedAmountStatus:boolean=false;
  loader:boolean=false;
  min_amount:number=0;
  payment_status_data:any;
  paymentStatus:boolean=false;
  paymentIntervalCheck:any;
  displayedColumns: string[] = ['order_id', 'order_des', 'status', 'created'];
  cartColumns: string[] = ['id', 'name', 'price', 'qnty','total'];
  dataSource:any;
  dummy:any;
  cartMessage:any;
  cartItem:any=[];

  constructor(private nowPaymnets:NowPaymnetsService,private productService:ProductsService){ }

  ngOnInit(): void {
    const cartitem=JSON.parse(localStorage.getItem('_cart') as any);
    this.cartItem=cartitem==null?[]:cartitem;
    this.loader=true;
    this.getCheckedCurrenccies();
    // this.getPaymentStatus()
    this.dummy=this.productService.product;
    this.loader=false;
  }
  
  getCheckedCurrenccies(){
    this.nowPaymnets.getCheckedCurrenccies().subscribe((res:any)=>{
      if (res) {
        this.currenciesList=res.selectedCurrencies;
        this.loader=false;
      } else {
        console.log("")
      }
    });
  }

  minPayoutAmount(currency_from:any){
    const currency_to='btc';
    this.nowPaymnets.getMinimumPaymentAmount(currency_from.value,currency_to).subscribe((res:any)=>{
      if (res) {
        this.min_amount=res.min_amount;
        this.getEstimatePrice(res,currency_from)
      } else {
        
      }
    })
  }

  getEstimatePrice(min_pay_amnt:any,currency_from:any){
    this.nowPaymnets.getEstimatePrice(this.getTotalCost(),(currency_from.value).toLowerCase()).subscribe((res:any)=>{
      if (res) {
        if (min_pay_amnt<res.estimated_amount) {
          alert("It is larger than the minimum payment amount")
        } else {
          this.estimated_amount=res;
          this.estimatedAmountStatus=true;          
        }
      }
    })
  }

  // submit data
  // submit(event:Event){
  //   event.preventDefault();
  //   // console.log(this.fcn_amount,this.fcn_c_from)
  //   const payload={
  //     "price_amount": this.getTotalCost(),
  //     "price_currency": this.fcn_c_from.value,
  //     "pay_currency": "btc",
  //     "ipn_callback_url": "https://nowpayments.io",
  //     "order_id": "123",
  //     "order_description": "Test Buy",
  //     "is_fixed_rate": true,
  //     "is_fee_paid_by_user": false
  //   }
  //   this.nowPaymnets.createPaymnet(payload).subscribe((res:any)=>{
  //     if (res.payment_status==='waiting') {
  //       let data={id:res.payment_id};
  //       let d=(localStorage.getItem('_trans_hist'))
  //       // console.log(d)
  //       const d1:any=[]
  //       d1.push(d)
  //       d1.push(data)
  //       localStorage.setItem('_trans_hist',JSON.stringify(d1))
  //       // this.getPaymentStatus()
  //     }
  //   })
  // }

  getPaymentStatus(paymentInfo:any){
    this.paymentStatus=true;
    // this.createPaymnetInvoice(paymentInfo);
    this.nowPaymnets.getPaymentStatus(paymentInfo.payment_id).subscribe((res:any)=>{
      if (res) {
        if (res.payment_status==="waiting") {
          this.payment_status_data=res.payment_status;
        } else if(res.payment_status==="confirming"){
          this.payment_status_data=res.payment_status;
        }else if(res.payment_status==="confirmed"){
          this.payment_status_data=res.payment_status;
        }else if(res.payment_status==="sending"){
          this.payment_status_data=res.payment_status;
        }else if(res.payment_status==="partially_paid"){
          this.payment_status_data=res.payment_status;
        }else if(res.payment_status==="finished"){
          this.payment_status_data=res.payment_status;
          clearInterval(this.paymentIntervalCheck);
        }else if(res.payment_status==="failed"){
          this.payment_status_data=res.payment_status;
          clearInterval(this.paymentIntervalCheck);
        }else if(res.payment_status==="refunded"){
          this.payment_status_data=res.payment_status;
          clearInterval(this.paymentIntervalCheck);
        }else if(res.payment_status==="expired"){
          this.payment_status_data=res.payment_status;
          clearInterval(this.paymentIntervalCheck);
        }
        // this.payment_status_data.push(res);
        // this.dataSource = this.payment_status_data;
        // console.log(this.dataSource)
      }
    });
  }
//   data={
//     "payment_id": "6049172010",
//     "payment_status": "waiting",
//     "pay_address": "0x827297c304Cc789B43C7Deb1cd10eb1E628Fad19",
//     "price_amount": 1210,
//     "price_currency": "usd",
//     "pay_amount": 0.78533046,
//     "amount_received": 0.05469853,
//     "pay_currency": "eth",
//     "order_id": "T-1",
//     "order_description": "Test Buy 1",
//     "ipn_callback_url": "https://nowpayments.io/",
//     "created_at": "2023-02-10T11:35:40.142Z",
//     "updated_at": "2023-02-10T11:35:40.142Z",
//     "purchase_id": "4403048615",
//     "smart_contract": null,
//     "network": "eth",
//     "network_precision": null,
//     "time_limit": "2023-02-10T11:55:40.071Z",
//     "burning_percent": null,
//     "expiration_estimate_date": "2023-02-10T11:55:40.071Z",
//     "is_fixed_rate": true,
//     "is_fee_paid_by_user": false,
//     "valid_until": "2023-02-10T11:55:40.071Z",
//     "type": "crypto2crypto"
// }

  // createPaymnetInvoice(payment_invoice:any){
  //   const payload={
  //     "price_amount": payment_invoice.price_amount,
  //     "price_currency": payment_invoice.price_currency,
  //     "order_id": payment_invoice.order_id,
  //     "order_description": payment_invoice.order_description,
  //     "ipn_callback_url": payment_invoice.ipn_callback_url,
  //     "success_url": "https://nowpayments.io",
  //     "cancel_url": "https://nowpayments.io",
  //     "partially_paid_url": "https://nowpayments.io",
  //     "is_fixed_rate": true,
  //     "is_fee_paid_by_user": false
  //   }
        
  //   this.nowPaymnets.createPaymnetInvoice(payload).subscribe((res:any)=>{
  //     if (res) {
  //       console.log(res)
  //     }
  //   });
  // }

  // Cart
  
  addToCart(item:any){
    if (this.cartItem.length===0) {
      item.quantity=1;
      this.cartItem.push(item)
      localStorage.setItem('_cart',JSON.stringify(this.cartItem));
    }else{
      const check:boolean=this.cartItem.find((i:any)=>{
        return i.id===item.id;
      });

      if(check){
        this.cartItem.find((i:any)=>{
          if(i.id===item.id){
            i.quantity++;
          }
        });
        localStorage.setItem('_cart',JSON.stringify(this.cartItem));
      }else{
        item.quantity=1;
        this.cartItem.push(item);
        localStorage.setItem('_cart',JSON.stringify(this.cartItem));
      }
    }
  }

  getTotalCost(){
    let c=0;
    let t=0;
    this.cartItem.forEach((e:any) => {
      c=e.price * e.quantity
      t+=c;
    });
    return t;
  }

  // Buy
  buy(){
    console.log(this.cartItem)
    const payload={
      "price_amount": this.getTotalCost(),
      "price_currency": "usd",
      "pay_currency": (this.fcn_c_from.value)?.toLowerCase(),
      "ipn_callback_url": "https://nowpayments.io/",
      "order_id": "T-1",
      "order_description": "Test Buy 1",
      "is_fixed_rate": true,
      "is_fee_paid_by_user": false
    }
    this.nowPaymnets.createPaymnet(payload).subscribe((res:any)=>{
      console.log(res)
      if (res.payment_status==='waiting') {
        let data={id:res.payment_id};
        let d=(localStorage.getItem('_trans_hist'))
        // console.log(d)
        const d1:any=[]
        d1.push(d)
        d1.push(data)
        localStorage.setItem('_trans_hist',JSON.stringify(d1))
        this.setPaymentInterval(res);
      }
    })
  }

  setPaymentInterval(paymentInfo:any){
   this.paymentIntervalCheck= setInterval(()=>{
      this.getPaymentStatus(paymentInfo)
    },5000)
  }

  // buy(){
  //   const payload={
  //     "price_amount": this.getTotalCost(),
  //     "price_currency": (this.fcn_c_from.value)?.toLowerCase(),
  //     "order_id": "T1",
  //     "order_description": "Test Desc 1",
  //     "ipn_callback_url": "https://nowpayments.io",
  //     "success_url": "https://nowpayments.io",
  //     "cancel_url": "https://nowpayments.io",
  //     "partially_paid_url": "https://nowpayments.io",
  //     "is_fixed_rate": true,
  //     "is_fee_paid_by_user": false
  //   }
  //   this.nowPaymnets.createPaymnetInvoice(payload).subscribe((res:any)=>{
  //     console.log(res)
  //   })
    
  // }

  // form error message handel
  fcn_c_from=new FormControl('',Validators.required);
  fcn_amount=new FormControl('',[Validators.required,Validators.min(this.min_amount)])

  getCurrencyError(){
    if (this.fcn_c_from.hasError('required')) {
      return 'You must enter value'
    }
    return this.fcn_c_from.hasError('fcn_c_from')? 'Not' : ''
  }
  getAmountError(){
    if (this.fcn_c_from.hasError('required')) {
      return 'You must enter value'
    }
    return this.fcn_c_from.hasError('fcn_amount')? 'Not' : 'Minimum amount : '+this.min_amount
  }
}
