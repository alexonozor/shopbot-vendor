import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { RolesAndPermission } from '../models/roles-and-permission';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { RolesAndPermissionsService } from '../services/roles-and-permissions.service';

@Injectable({
  providedIn: 'root'
})

export class PermissionsResolver implements Resolve<RolesAndPermission[]> {
  constructor(private permissionService: RolesAndPermissionsService) {}

  resolve(): Observable<RolesAndPermission[]> {
    return this.permissionService.getPermissions();
  }
}


@Injectable({
  providedIn: 'root'
})

export class PermissionResolver implements Resolve<RolesAndPermission> {
  constructor(private permissionService: RolesAndPermissionsService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<RolesAndPermission> {
    const id = route.paramMap.get('id')
    return this.permissionService.getPermission(id);
  }
}
