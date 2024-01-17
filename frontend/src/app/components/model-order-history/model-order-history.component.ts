import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-model-order-history',
  templateUrl: './model-order-history.component.html',
  styleUrl: './model-order-history.component.scss'
})
export class ModelOrderHistoryComponent {
  orderDetails:any;
  @ViewChild('myModal', {static: false}) modal!: ElementRef;

  open(res:any) {
    this.modal.nativeElement.style.display = 'block';
    this.orderDetails = res.data.orderDetail
    // console.log(this.modal)
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }

  print(){
    window.print();
    console.log('print')
  }

}
