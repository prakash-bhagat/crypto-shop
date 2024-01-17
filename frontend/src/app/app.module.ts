import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShopComponent } from './components/shop/shop.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { NotFoundComponent } from './shared/404/404.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ModelOrderHistoryComponent } from './components/model-order-history/model-order-history.component';
import { HomeSkeletonComponent } from './shared/home-skeleton/skeleton.component';
import { ShopSkeletonComponent } from './shared/shop-skeleton/shop-skeleton.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';
import { ProcessingComponent } from './components/processing/processing.component';
import { ToasterComponent } from './shared/toaster/toaster.component';
import { PaymentMessageComponent } from './components/payment-message/payment-message.component';
import { UserMenuComponent } from './shared/user-menu/user-menu.component';
import { authInterceptor } from './interceptors/auth.interceptor';
import { BtnLoaderComponent } from './shared/btn-loader/btn-loader.component';
import { ProductFilterComponent } from './shared/product-filter/product-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductListComponent,
    ShopComponent,
    CheckoutComponent,
    AccountComponent,
    CartComponent,
    PaymentComponent,
    RegisterComponent,
    LoginComponent,
    LoaderComponent,
    NotFoundComponent,
    ForgetPasswordComponent,
    OrderHistoryComponent,
    ModelOrderHistoryComponent,
    HomeSkeletonComponent,
    ShopSkeletonComponent,
    FaqComponent,
    ContactComponent,
    ConfirmationModalComponent,
    ProcessingComponent,
    ToasterComponent,
    PaymentMessageComponent,
    UserMenuComponent,
    BtnLoaderComponent,
    ProductFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
  ],
  providers: [AuthService,provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
