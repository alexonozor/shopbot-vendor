import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})

export class AdminsResolver implements Resolve<Admin[]> {
  constructor(private adminService: AdminService) {}

  resolve(): Observable<Admin[]> {
    return this.adminService.getAdmins();
  }
}


@Injectable({
  providedIn: 'root'
})

export class AdminResolver implements Resolve<Admin> {
  constructor(private adminService: AdminService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<Admin> {
    const id = route.paramMap.get('id')
    return this.adminService.getAdmin(id);
  }
}
