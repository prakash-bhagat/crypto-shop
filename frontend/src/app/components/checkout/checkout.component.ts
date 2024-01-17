import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{

  cartItems: any[] = [];
  cart:any;
  sum:number=0;
  amount: number=0;
  currency: string='btc';
  productName: string='Crypto Shop';
  selectedMethod:any;
  aggrementCheck:Boolean = true;
  userInfo:any;
  product:any=[]
  process:boolean=false;
  cryptoForm!:FormGroup;
  selectCurrency:any;
  isCrypto:boolean=false;
  // selectedCurrencies:any;
  showCurrencyDropdown:boolean=false;
  paymentPage:boolean=false;
  toast:boolean=false;
  payLoader:boolean=false;

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private orderService:OrderService,
    private router:Router,private fb:FormBuilder,
    private alertService:AlertService,
    ) {}

  ngOnInit(): void {
      this.cart = JSON.parse(localStorage.getItem("cart") || '[]');
      if (this.cart.length>0) {
        this.cartItems = this.cart;
      } else {
        this.router.navigate(['/cart'])
      }
      this.total();
      this.userInfo = JSON.parse(localStorage.getItem("_u") || '');
      // console.log(this.userInfo[0].m)
      this.forms();
      this.createPayload();
      
  }
  forms(){
    this.cryptoForm = this.fb.group({
      selectedCurrencies:['',Validators.required],
    })
  }

  total(){
    let total = 0;
    this.cart.forEach((element:any) => {
      total += Number(element.quantity) * Number(element.price);
    });
    this.sum=total;
   }

   aggrement(){
    this.aggrementCheck = !this.aggrementCheck;
   }

   payMethod(method:any){
    if (method==='2') {
      this.process=true;
      this.paymentService.getCurrencies().subscribe((res:any)=>{
        if (res.status===true) {
          this.selectCurrency = res.data.map((up:any)=> up.toUpperCase())
          // this.selectCurrency=res.data;
          // console.log(this.selectCurrency)
          this.showCurrencyDropdown=true;
          this.process=false;
        }else{
          this.process=false;
          this.alertService.success('Error please try again');
        }
      },(err:any)=>{
        this.alertService.success('Error please try again');
        this.process=false;
      })
    }
   }

   currencySelected(){
    if (this.cryptoForm.get('selectedCurrencies')?.value) {
      this.process=true;
      this.paymentService.getMinimumPaymentAmount({amount:this.sum,currency_from:this.cryptoForm.get('selectedCurrencies')?.value})
      .subscribe((res:any)=>{
        if (res.status===true) {
          // if (Number(res.min_pay)<Number(res.estimated_amount)) {
          //   this.alertService.success('Please select different currency');
          //   this.process=false;
          //   this.isCrypto=false;
          // } else { 
            this.process=false;
            this.isCrypto=true;         
          // }
        }else{
          this.alertService.success('Error select another coin')
          this.process=false;
          this.isCrypto=false;
        }
      },(err:any)=>{
        this.alertService.success('Error')
        this.process=false;
        this.isCrypto=false;
      })
    }
   }

   createPayload(){
    this.cartItems.forEach((item:any)=>{
      let obj={productId:item.id,quantity:item.quantity,price:item.price,productName:item.name,categoryName:item.category};
      this.product.push(obj);
    })
    // console.log(this.product);
   }

   makePayment(){
    this.process=true;
    const payload_cod={
      mobile:this.userInfo[0].m,
      total_amount:this.sum,
      product:this.product,
      method:this.selectedMethod,
    }
    const payload_crypto_order={
      mobile:this.userInfo[0].m,
      total_amount:this.sum,
      product:this.product,
      method:this.selectedMethod,
    }

    if (this.selectedMethod==='1') {
      window.alert('INR PAYMENT')
    } else if(this.selectedMethod==='2'){
      this.payLoader=true;
      this.orderService.COD(payload_crypto_order).subscribe((res:any)=>{
        if(res.status===true){
          const payload_crypto={
            "price_amount": this.sum, //required
            "pay_currency": this.cryptoForm.get('selectedCurrencies')?.value, //required
            "order_id": res.data,
            "order_description": `${res.message} and Order id:${res.data}`,
          }
          this.paymentService.createPayment(payload_crypto).subscribe((res:any)=>{
            if (res.status===true) {
              // localStorage.removeItem('cart');
              // this.cartService.setView()
              this.paymentService.sendData(res.data);
              this.process=false;
              this.payLoader=false;
              this.router.navigate(['/pay']);
              // window.open(res.data.invoice_url,'_blank');
            }else{
              this.alertService.success('Error occured')
            }
          },(err)=>{
            this.alertService.success('Error')
          });
          // this.process=false;
          // this.payLoader=false;
          // localStorage.removeItem('cart');
          // this.cartService.setView()
        }else{
          if (res.message==='User address required') {
            this.toast=true;
            const cnfrm = confirm(res.message)
            if (cnfrm == true) {
              this.router.navigate(['/account']);
              this.payLoader=false;
            }
          }else{
            this.process=false;
            this.payLoader=false;
            this.alertService.success(res.message)
          }
        }
      });
    }else if(this.selectedMethod==='3'){
      this.payLoader=true;
      this.orderService.COD(payload_cod).subscribe((res:any)=>{
        if(res.status===true){
          this.alertService.isConfirmed({title:res.message,icon:'success',text:`Order id : ${res.data}`})
          .then((result:any)=>{
            if (result.isConfirmed) {
              this.router.navigateByUrl('/history');
            }
          })
          this.process=false;
          this.payLoader=false;
          // localStorage.removeItem('cart');
          // this.cartService.setView()
        }else{
          if (res.message==='User address required') {
            this.toast=true;
            const cnfrm = confirm(res.message)
            if (cnfrm == true) {
              this.router.navigate(['/account']);
              this.payLoader=false;
            }
          }else{
            this.process=false;
            this.payLoader=false;
          window.alert(res.message)
          }
        }
      },(err:any)=>{this.process=false})
    }else{
      window.alert('Please select payment method')
    }
   }

}
