import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.snackBar.open('Unauthorize!! Please login :(', 'CLOSE', {duration: 3000});
          this.router.navigate(['auth']);
        } else if (err.status === 404) {
          this.snackBar.open('No record found for your request :(', 'CLOSE');
          this.router.navigate(['auth']);
          return;
        }
      }
    }));
  }

  constructor(
    public dialog: MatDialog,
    public auth: AuthService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {
    console.log('dsdfsdfsdfsdf')
   }

}
