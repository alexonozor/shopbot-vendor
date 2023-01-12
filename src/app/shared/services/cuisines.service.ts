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
import { Cuisine } from '../models/cuisine';

@Injectable()
export class CuisinesService {
  cuisines!: any[];
  private hostServer: string = environment.hostServer;
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {}


  createCuisine(params:any) {
    return this._httpClient.post(`${this.hostServer}/cuisines`, params);
  }
  

  getCuisines(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.hostServer}/cuisines`);
  }

  getCuisine(id:any): Observable<Cuisine> {
    return this._httpClient.get<Cuisine>(`${this.hostServer}/cuisines/${id}`);
  }

  updateCuisine(cuisineId: string, params:any) {
    return this._httpClient.put(`${this.hostServer}/cuisines/${cuisineId}`, params);
  }

  deleteCuisine(cuisineId: string) {
    return this._httpClient.delete(`${this.hostServer}/cuisines/${cuisineId}`);
  }
}
