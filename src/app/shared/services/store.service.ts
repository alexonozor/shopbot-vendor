import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '../models/store';

@Injectable()
export class StoreService {
  users!: any[];
  private hostServer: string = environment.hostServer;

  constructor(private _httpClient: HttpClient) {}

  createStore(admin: any): Observable<Store> {
    return this._httpClient.post<Store>(`${this.hostServer}/stores`, admin);
  }

  getMerchantStore(id: string): Observable<Store> {
    return this._httpClient.get<Store>(
      `${this.hostServer}/stores/merchant/${id}`
    );
  }

  updateStore(id: string, params: any): Observable<Store> {
    return this._httpClient.put<Store>(
      `${this.hostServer}/stores/${id}`,
      params
    );
  }

  saveStore(store: any, id: string) {
    return this._httpClient.put(`${this.hostServer}/stores/${id}`, store);
  }

  addStore(store: Store): Observable<any> {
    return this._httpClient.post(`${this.hostServer}/stores`, store);
  }

  getStoreOrders(storeId: string) {
    return this._httpClient.get<any[]>(
      `${this.hostServer}/orders/store/${storeId}/orders`
    );
  }

  deleteStoreOrders(orderId: string) {
    return this._httpClient.delete(`${this.hostServer}/orders/${orderId}`);
  }

  updateOrderStatus(orderId: string, userId: string, status: any) {
    return this._httpClient.put(
      `${this.hostServer}/orders/${orderId}/status/${userId}`,
      status
    );
  }

   /**
   * upload store
   *
   * @param formData
   * @returns {Promise<any>}
   */
   uploadLogo(formData: any, id?: string): Observable<any> {
    return this._httpClient.post(`${this.hostServer}/stores/upload/${id}/logo`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  uploadBanner(formData: any, id?: string): Observable<any> {
    return this._httpClient.post(`${this.hostServer}/stores/upload/${id}/banner`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }




 




}
