import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services';
import { Store } from '../models/store';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})

export class MerchantStoreResolver implements Resolve<Store> {
  constructor(private merchantService: AuthService, private store: StoreService) {}
  resolve(): Observable<Store> {
   const merchantId = this.merchantService.currentUser._id
    return this.store.getMerchantStore(merchantId)
  }
}



