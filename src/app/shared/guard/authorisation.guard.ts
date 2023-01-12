import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService,
        private snackbar: MatSnackBar
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUser;
        if (currentUser) {
            // check if route is restricted by role
            if (route.data['roles'] && route.data['roles'].indexOf(currentUser.role.name) === -1) {
                // role not authorised so redirect to home page
                this.snackbar.open('Unauthorized', 'Close', {duration: 5000});
                this.router.navigate(['/']);
                return false;
            }
           
            // authorised so return true
            return true;
        }
        this.snackbar.open('Unauthorized user please login', 'Close', {duration: 5000});
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
