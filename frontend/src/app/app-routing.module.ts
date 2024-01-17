import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShopComponent } from './components/shop/shop.component';
import { AccountComponent } from './components/account/account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { LoaderComponent } from './shared/loader/loader.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { NotFoundComponent } from './shared/404/404.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentMessageComponent } from './components/payment-message/payment-message.component';
// console.log(authGuard);
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'shop',component:ShopComponent},
  {path:'product/:id',component:ProductListComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent,canActivate:[authGuard]},
  {path:'history',component:OrderHistoryComponent,canActivate:[authGuard]},
  {path:'account',component:AccountComponent,canActivate:[authGuard]},
  {path:'pay',component:PaymentComponent,canActivate:[authGuard]},
  {path:'message',component:PaymentMessageComponent,canActivate:[authGuard]},
  {path:'signup',component:RegisterComponent},
  {path:'signin',component:LoginComponent},
  {path:'reset',component:ForgetPasswordComponent},
  {path:'faq',component:FaqComponent},
  {path:'contact',component:ContactComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration:'top'})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
