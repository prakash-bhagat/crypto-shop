import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ModelOrderHistoryComponent } from '../model-order-history/model-order-history.component';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit{

  orderInfo:any;
  @ViewChild('modal', {static: false}) modal!: ModelOrderHistoryComponent
  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    var temLocal:any = localStorage.getItem('_u');
    if (localStorage.getItem('_u') !== null) {
      const tem = JSON.parse(temLocal);
      this.orderService.getAll({mobile:tem[0].m}).subscribe((res:any)=>{
        if(res.status===true){
          this.orderInfo=res.data
        }
      })
    } 
  }

  view(id:any){
    this.orderService.getOne({orderinfo:id}).subscribe((res:any)=>{
      if(res.status===true){
        // console.log(res);
        this.modal.open(res)
      }
    })
  }

}
