import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) { }

  canActivate(): boolean {
    if (!this.authService.loggedIn()) {
      this.snackbar.open('Unauthorized', 'Close', {
        duration: 3000
    });
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }

}
