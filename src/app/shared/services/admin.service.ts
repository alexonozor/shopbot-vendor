import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin';

@Injectable()
export class AdminService {
  users!: any[];
  private hostServer: string = environment.hostServer;
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {}

  createAdmin(admin:any): Observable<Admin> {
    return this._httpClient.post<Admin>(`${this.hostServer}/staffs`, admin);
  }

  getAdmins(): Observable<Admin[]> {
    return this._httpClient.get<Admin[]>(`${this.hostServer}/staffs`);
  }

  getAdmin(id:any): Observable<Admin> {
    return this._httpClient.get<Admin>(`${this.hostServer}/staffs/${id}`);
  }

  deleteAdmin(id:any): Observable<Admin> {
    return this._httpClient.delete<Admin>(`${this.hostServer}/staffs/${id}`);
  }

  updateAdmin(id:string, params: any) : Observable<Admin> {
    return this._httpClient.put<Admin>(`${this.hostServer}/staffs/${id}`, params);
  } 
}
