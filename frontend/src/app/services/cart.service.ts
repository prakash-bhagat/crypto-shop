import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>(this.cartItems);

  constructor() {
    // Retrieve cart items from localStorage on service initialization
    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
  }

  setView() {
    this.cartSubject.next(JSON.parse(localStorage.getItem("cart") || '[]'))
  }

  getCartItems(): Observable<any[]> {
    return this.cartSubject.asObservable();
  }


  private saveCartItems(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  addToCart(p: any): void {
    // this.cartItems.push(item);
    // this.saveCartItems();
    if (this.cartItems.length === 0) {
      p.quantity = 1;
      p.check = true;
      this.cartItems.push(p)
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      // this.toast.success(`${p.name} New to the cart`, 'Product Added', {
      //   timeOut: 1500,
      //   progressBar: true,
      //   progressAnimation: 'increasing',
      //   positionClass: 'toast-top-right'
      // });
    } else {
      const chk: boolean = this.cartItems.find(items => {
        return items.id == p.id
      });
      if (chk) {
        // console.log("hdsfjdhf");
        this.cartItems.find(items => {
          if (items.id == p.id) {
            items.quantity++;
          }
        });
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        // this.toast.success(`${p.name} Updated to the cart`, 'Product Update', {
        //   timeOut: 1500,
        //   progressBar: true,
        //   progressAnimation: 'increasing',
        //   positionClass: 'toast-top-right'
        // });  

      } else {
        // console.log("yyyyyyy");
        p.quantity = 1
        this.cartItems.push(p)
        localStorage.setItem('cart', JSON.stringify(this.cartItems))
      }

    }
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(arr: any, attr: any, value: any): void {
    var i = arr.length;
    while (i--) {
      if (arr[i]
        && arr[i].hasOwnProperty(attr)
        && (arguments.length > 2 && arr[i][attr] === value)) {

        const cnfrm = confirm(`Are u sure to remove ${arr[i].name}`)
        if (cnfrm === true) {
          arr[i].check = false;
          arr.splice(i, 1);
          localStorage.setItem('cart', JSON.stringify(arr));
          this.setView();
        }

      }
    }
    localStorage.setItem("cart", JSON.stringify(arr))
    this.setView();
  }

  getCart() {
    const item: any = localStorage.getItem("cart");
    const data = JSON.parse(item);
    return data;
  }

}
