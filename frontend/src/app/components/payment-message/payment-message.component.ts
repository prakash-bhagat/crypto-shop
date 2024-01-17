import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-message',
  templateUrl: './payment-message.component.html',
  styleUrl: './payment-message.component.scss'
})
export class PaymentMessageComponent implements OnInit{

  process:boolean=true;
  messageData:any;
  
  constructor(private paymentService:PaymentService,private router:Router){}

  ngOnInit(): void {
      this.paymentService.getPaymentMessageData().subscribe((res:any)=>{
        if (res.status === true) {
          this.messageData=res;
          setTimeout(() => {
            this.router.navigate(['/history'])
          }, 5000);
        }else{
          this.messageData=res;
          setTimeout(() => {
            this.router.navigate(['/history'])
          }, 5000);
        }
      });
  }

}
