import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { Store } from '../../models/store';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/shared/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input() store!: Store;
  @Input() order!: Order;


  constructor(
    private router: Router,
    private orderService: OrdersService,
    private _matSnack: MatSnackBar
  ) { }

  ngOnInit(): void {
  }


  openOrder(orderId:string) {
    this.router.navigate(['dashboard', 'orders', orderId, 'details'])
  }

  acceptedTime(status:any[]) {
    return status.find((stat) => stat.name == 'Accepted').updatedOn
   }


   canceledTime(status:any[]) {
    return status.find((stat) => stat.name == 'Canceled').updatedOn
   }

  markAsReady(event:any, order: Order) {
    event.stopPropagation();
    order.status.unshift({ id: 2, name: "Ready for Pickup", color: "text-blue-500", updatedOn: Date.now() })
    this.updateStatus({ id: 2, name: "Ready for Pickup", color: "text-blue-500", updatedOn: Date.now()}, order, false)
  }

  updateStatus(event:any, order:any, eventType = true) {
    this.orderService.updateOrderStatus(order._id, order.user._id, eventType?  event.value :  event).subscribe((data:any) => {    
      this._matSnack.open(`You have updated this order to ${event.name}`, 'Close', {duration: 3000})
    })
  }

  

}
