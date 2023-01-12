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
import { User } from '../models/user';

@Injectable()
export class UsersService {
  users!: any[];
  private hostServer: string = environment.hostServer;
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this.hostServer}/users`);
  }

  getUser(id:any): Observable<User> {
    return this._httpClient.get<User>(`${this.hostServer}/users/${id}`);
  }

  deleteUser(id:string): Observable<User> {
    return this._httpClient.delete<User>(`${this.hostServer}/users/${id}`);
  }

  updateUser(id:string, params: any) : Observable<User> {
    return this._httpClient.put<User>(`${this.hostServer}/users/${id}`, params);
  } 
}
