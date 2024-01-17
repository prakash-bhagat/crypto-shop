import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Collapse } from 'flowbite';
import type { CollapseOptions, CollapseInterface } from 'flowbite';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  cartItems: any[] = [];
  cart: any;
  isLoggedIn: Boolean = false;
  userInfo: any;

  constructor(private cartService: CartService,
    private router: Router,
    private authService: AuthService,) { }

  ngOnInit(): void {
    this.cartView()
    this.cart = JSON.parse(localStorage.getItem("cart") || '[]');
    this.cartItems = this.cart.length;
    this.authService.isAuthGetView().subscribe((res: any) => {
      if (res === true) {
        this.isLoggedIn = true;
        var temLocal: any = localStorage.getItem('_u');
        if (localStorage.getItem('_u') !== null) {
          const tem = JSON.parse(temLocal)
          this.userInfo = tem[0]
        } else {
          return;
        }
      }else{
        this.userInfo = []
        this.isLoggedIn = false;
      }
    })
  }

  cartView() {
    this.cartService.getCartItems().subscribe((res: any) => {
      // console.log(res)
      this.cartItems = res.length
    })
  }

  logout() {
    this.authService.logout();
    this.authService.isAuthGetView().subscribe((res:any)=>{
      if (res === false) {
            // console.log(res)
            this.isLoggedIn = false;
            // window.location.reload()
            this.router.navigate(['/signin'])
          }
    })
    // this.authService.isAuth().subscribe((res: any) => {
    //   // console.log(res)
    //   if (Boolean(res) === true) {
    //     // console.log(res)
    //     this.isLoggedIn = false;
    //     // window.location.reload()
    //     this.router.navigate(['/signin'])
    //   }
    // })
  }

  account(){
    this.router.navigateByUrl('/account')
  }


  isMenuShow: boolean = true;
  open: boolean = true;
  menuClick() {
    this.isMenuShow = !this.isMenuShow;
    this.open = !this.open;
  }

}
