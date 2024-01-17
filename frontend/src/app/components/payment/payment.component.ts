import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Observable, interval, map, shareReplay, takeWhile } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  providers: [DatePipe]
})
export class PaymentComponent implements OnInit, OnDestroy {

  paymentIntervalCheck: any;
  payment_status_data: any;
  timerInterval:any;
  timeDifference: any;
  payment_id: any;
  pay_amount: any;
  pay_currency: any
  process: boolean = true;
  startDate: any;
  endDate: any;

  constructor(private paymentService: PaymentService,private router:Router) {
    // window.history.pushState({page: 1}, "", "");
    //   history.back();
    //   history.forward();
    //   window.onpopstate = function(event) {
    //     if(event){
    //       var confirm = window.confirm("Please, note that you may lose your move details by returning to the previous page.");
    //     }
    //   }
  }

  ngOnInit(): void {
    this.paymentService.getData().subscribe((res:any)=>{
      // window.open(res.invoice_url,'_blank');
      // this.pay_amount=res.price_amount;
      this.pay_amount=res.pay_amount;
      this.pay_currency=res.pay_currency;
      // this.payment_id=res.id;
      this.payment_id=res.payment_id;
    this.startDate = new Date()//res.created_at;
    this.endDate = new Date(res.expiration_estimate_date)  //res.expiration_estimate_date;
    this.countDown()
    this.setPaymentInterval(res)
    })
  }

  setPaymentInterval(paymentInfo: any) {
    this.paymentIntervalCheck = setInterval(() => {
      this.getPaymentStatus(paymentInfo)
    }, 5000)
  }

  getPaymentStatus(paymentInfo: any) {//paymentInfo.payment_id
    this.paymentService.getPaymentStatus(Number(paymentInfo.payment_id)).subscribe((res: any) => {
      if (res) {
        this.process = false;
        if (res.payment_status === "waiting") {
          this.payment_status_data = res.payment_status;
        } else if (res.payment_status === "confirming") {
          this.payment_status_data = res.payment_status;
        } else if (res.payment_status === "confirmed") {
          this.payment_status_data = res.payment_status;
        } else if (res.payment_status === "sending") {
          this.payment_status_data = res.payment_status;
        } else if (res.payment_status === "partially_paid") {
          this.payment_status_data = res.payment_status;
        } else if (res.payment_status === "finished") {
          this.payment_status_data = res.payment_status;
          clearInterval(this.paymentIntervalCheck);
          this.paymentService.sendPaymentMessageData(res);
          this.router.navigate(['/message']);
        } else if (res.payment_status === "failed") {
          this.payment_status_data = res.payment_status;
          clearInterval(this.paymentIntervalCheck);
          this.paymentService.sendPaymentMessageData(res);
          this.router.navigate(['/message']);
        } else if (res.payment_status === "refunded") {
          this.payment_status_data = res.payment_status;
          clearInterval(this.paymentIntervalCheck);
          this.paymentService.sendPaymentMessageData(res);
          this.router.navigate(['/message']);
        } else if (res.payment_status === "expired") {
          this.payment_status_data = res.payment_status;
          clearInterval(this.paymentIntervalCheck);
          this.paymentService.sendPaymentMessageData(res);
          this.router.navigate(['/message']);
        }
        // this.payment_status_data.push(res);
        // this.dataSource = this.payment_status_data;
        // console.log(this.payment_status_data)
      } else {
        clearInterval(this.paymentIntervalCheck);
        this.router.navigate(['/message']);
        this.paymentService.sendPaymentMessageData(res);
      }
    }, (err: any) => {
      clearInterval(this.paymentIntervalCheck);
      this.router.navigate(['/message']);     
      this.paymentService.sendPaymentMessageData(err.error);
    });
  }

  countDown() {
    // Set the date we're counting down to
    var countDownDate = new Date(this.endDate).getTime();

    // Update the count down every 1 second
    this.timerInterval = setInterval(() => {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      this.timeDifference = hours + "Hrs "
        + minutes + "Min " + seconds + "S ";

      // If the count down is finished, write some text
      if (distance < 0) {
        this.process=true;
        clearInterval(this.timerInterval);
        this.timeDifference = "EXPIRED";
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval)
    clearInterval(this.paymentIntervalCheck);
  }

}

// if (res.status === true) {
//   this.process = false;
//   if (res.data.payment_status === "waiting") {
//     this.payment_status_data = res.data.payment_status;
//   } else if (res.data.payment_status === "confirming") {
//     this.payment_status_data = res.data.payment_status;
//   } else if (res.data.payment_status === "confirmed") {
//     this.payment_status_data = res.data.payment_status;
//   } else if (res.data.payment_status === "sending") {
//     this.payment_status_data = res.data.payment_status;
//   } else if (res.data.payment_status === "partially_paid") {
//     this.payment_status_data = res.data.payment_status;
//   } else if (res.data.payment_status === "finished") {
//     this.payment_status_data = res.data.payment_status;
//     clearInterval(this.paymentIntervalCheck);
//     this.paymentService.sendPaymentMessageData(res);
//     this.router.navigate(['/message']);
//   } else if (res.data.payment_status === "failed") {
//     this.payment_status_data = res.data.payment_status;
//     clearInterval(this.paymentIntervalCheck);
//     this.paymentService.sendPaymentMessageData(res);
//     this.router.navigate(['/message']);
//   } else if (res.data.payment_status === "refunded") {
//     this.payment_status_data = res.data.payment_status;
//     clearInterval(this.paymentIntervalCheck);
//     this.paymentService.sendPaymentMessageData(res);
//     this.router.navigate(['/message']);
//   } else if (res.data.payment_status === "expired") {
//     this.payment_status_data = res.data.payment_status;
//     clearInterval(this.paymentIntervalCheck);
//     this.paymentService.sendPaymentMessageData(res);
//     this.router.navigate(['/message']);
//   }
//   // this.payment_status_data.push(res);
//   // this.dataSource = this.payment_status_data;
//   // console.log(this.payment_status_data)
// }