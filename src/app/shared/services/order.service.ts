import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable()
export class OrdersService {
  orders!: any[];
  private hostServer: string = environment.hostServer;

  private orders$ = new BehaviorSubject<any>(null);
  selectedOrders = this.orders$.asObservable();
  
  constructor(private _httpClient: HttpClient) {}

  getOrders(query: any): Observable<any[]> {
    const obj: any = query;
    const queryParams = JSON.stringify(obj);
    return this._httpClient.get<any[]>(
      `${this.hostServer}/orders?query=${queryParams}`
    );
  }

  getUserOrders(id:any): Observable<Order[]> {
    return this._httpClient.get<Order[]>(`${this.hostServer}/orders/user/${id}`);
  }

  getOrder(id:any): Observable<Order> {
    return this._httpClient.get<Order>(`${this.hostServer}/orders/${id}`);
  }

  updateOrderStatus(orderId: string, userId: string, status: any) {
    return this._httpClient.put(`${this.hostServer}/orders/${orderId}/status/${userId}`, status);
  }


  updateOrder(orderId: string, status: any) {
    return this._httpClient.put(`${this.hostServer}/orders/${orderId}`, status);
  }

  deleteOrder(orderId: string) {
    return this._httpClient.delete(`${this.hostServer}/orders/${orderId}`);
  }

  getStoreOrder(order: any) {
    return this._httpClient.post<Order[]>(`${this.hostServer}/orders/store/orders/merchants`, order);
  }

  broadcast(order:Order) {
    this.orders$.next(order); 
  }

  
}
