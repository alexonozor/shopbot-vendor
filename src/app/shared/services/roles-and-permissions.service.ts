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
import { RolesAndPermission } from '../models/roles-and-permission';

@Injectable()
export class RolesAndPermissionsService {
  permissions!: RolesAndPermission[];
  private hostServer: string = environment.hostServer;
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {}


  createPermission(params:any) {
    return this._httpClient.post(`${this.hostServer}/roles`, params);
  }
  

  getPermissions(): Observable<RolesAndPermission[]> {
    return this._httpClient.get<RolesAndPermission[]>(`${this.hostServer}/roles`);
  }

  getPermission(id:any): Observable<RolesAndPermission> {
    return this._httpClient.get<RolesAndPermission>(`${this.hostServer}/roles/${id}`);
  }

  updatePermission(permissionId: string, params:any) {
    return this._httpClient.put(`${this.hostServer}/roles/${permissionId}`, params);
  }

  deletePermission(permissionId: string) {
    return this._httpClient.delete(`${this.hostServer}/roles/${permissionId}`);
  }
}
