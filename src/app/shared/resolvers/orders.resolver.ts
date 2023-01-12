import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { OrdersService } from '../services/order.service';

@Injectable({
  providedIn: 'root'
})

export class OrdersResolver implements Resolve<Order[]> {
  constructor(private orderService: OrdersService) {}

  resolve(): Observable<Order[]> {
    return this.orderService.getOrders({
      data: {$match: { }},
      control:[   { $sort: { 'createdAt': -1 }}] 
     });
  }
}


@Injectable({
  providedIn: 'root'
})

export class OrderResolver implements Resolve<Order> {
  constructor(private orderService: OrdersService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<Order> {
    const id = route.paramMap.get('id')
    return this.orderService.getOrder(id);
  }
}
