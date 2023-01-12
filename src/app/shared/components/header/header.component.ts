import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JwtService } from '../../services/jwt.service';
import { Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import { ProgressBarService } from '../../services/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-headers',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();


  constructor(
    private progress: NgProgress,
    public progressBar: ProgressBarService,
    public authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.progressBar.progressRef = this.progress.ref('progressBar');
  }

  logOut() {
    this.jwtService.destroyToken();
    localStorage.removeItem('USER_TYPE');
    localStorage.removeItem('USER');
    this.snackbar.open('Logged Out', 'close', {duration: 2000});
    this.router.navigate(['/login']);
  }


  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
