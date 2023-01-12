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

@Injectable()
export class DashboardService {
  orders!: any[];
  private hostServer: string = environment.hostServer;
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {}

  getOrderStat(date:any) {
    let httpParams = new HttpParams({ fromObject: date });
    return this._httpClient.get(`${this.hostServer}/dashboard/total_sales?${httpParams.toString()}`);
  }

  getOrderMonthlyChart(): Observable<any[]> {
    
    return this._httpClient.get<any[]>(`${this.hostServer}/dashboard/group`);
  }
}