import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private hostServer: string = environment.hostServer;

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  updateStaff(userId:string, params:any): Observable<any> {
    return this._httpClient.put(`${this.hostServer}/staffs/${userId}`, params)
  }
}
