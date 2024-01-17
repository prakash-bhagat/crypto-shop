import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { PromocodeService } from '../../services/promocode.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartItems: any[] = [];
  cart:any;
  sum:number=0;
  promocodeText:boolean=false;
  promocodeValue:string='';

  constructor(private cartService: CartService,
    private promoCodeService:PromocodeService) {}

  ngOnInit(): void {
      this.cart = JSON.parse(localStorage.getItem("cart") || '[]');
      this.cartItems = this.cart;
      this.total();
  }

  plus(c:any,event:Event){
    const chk:boolean= this.cart.find((items:any)=>{
     return items.id == c.id
   });
   if(chk){
     this.cart.find((items:any)=>{
       if(items.id==c.id){
         items.quantity++;
       }
     })
     localStorage.setItem('cart',JSON.stringify(this.cart));
     this.cartService.setView();
     this.ngOnInit();
   }
   
 }
 minus(c:any,event:Event){
   const chk:boolean= this.cart.find((items:any)=>{
     return items.id == c.id
   });
   if(chk){
     this.cart.find((items:any)=>{
       if (c.quantity >=2 && items.id == c.id) {
         items.quantity--;
       }
     })
     localStorage.setItem('cart',JSON.stringify(this.cart));
     this.cartService.setView();
     this.ngOnInit();
   }
 }
 remove(c:any){
  const chk:boolean= this.cart.find((items:any)=>{
    return items.id == c.id
  });
  if(chk){
    this.cart.find((items:any,i:any)=>{
      if (items.id == c.id) {
       const cnfrm = confirm(`Are u sure to remove ${items.name}`)
       if (cnfrm === true) {
        this.cart.splice(i,1);
        localStorage.setItem('cart',JSON.stringify(this.cart));
        this.cartService.setView();        
       }
      }
    })
  }
 }

 total(){
  let total = 0;
  this.cart.forEach((element:any) => {
    total += Number(element.quantity) * Number(element.price);
  });
  this.sum=total;
 }

 promocode(code:any){
  this.promoCodeService.getPromoCode({coupon:code}).subscribe((res:any)=>{
    if (res.length > 0) {
      if (this.promocodeValue === res[0].code) {
        confirm('Promo Code already applied')
      } else {
        confirm(`Promo code ${res[0].name} applied you got ${res[0].discount}%`)
        const decimal:any = (Number(res[0].discount)/100).toFixed(2);
        const discount = this.sum * decimal;
        const newPrice = this.sum-discount;
        this.sum = newPrice;
        this.promocodeText = true;
        console.log(newPrice)
      }
      console.log(this.promocodeValue,res,code)
    }else{
      confirm('Invalid Promo Code')
    }
  },(err:any)=>{
    console.error(err)
  })
 }
  
}
