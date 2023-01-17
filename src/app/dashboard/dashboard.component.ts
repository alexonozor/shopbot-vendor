import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Role } from '../shared/models/role';
import { JwtService, AuthService } from '../shared/services';
import { Store } from '../shared/models/store';
import { Socket } from 'ngx-socket-io';
import { NotificationsService } from '../shared/services/notifications.service';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from '../shared/services/order.service';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { StoreService } from 'src/app/shared/services/store.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  public userType:string | undefined;
  public destroyed = new Subject<void>();
  public currentScreenSize: string | undefined;
  public Role = Role
  public store: Store

  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(
    private jwtService: JwtService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    public auth: AuthService,
    public breakpointObserver: BreakpointObserver,
    private socket: Socket,
    private notificationService: NotificationsService,
    private orderService: OrdersService,
    private storeService: StoreService
  ) {
   this.store = this.route.snapshot.data['store'] as Store
  }

  ngOnInit(): void {
    this.getOrders();

  }

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  
  getOrders() {
    this.socket.fromEvent(this.store._id).subscribe((order => {
      if (order) {
        this.orderService.broadcast(order as Order)
        this.notificationService.broadCast(order)
      }
    }))
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  logOut() {
    this.auth.logout();
    this.snackbar.open('Logged Out', 'close', {duration: 2000});
  }

  changeStoreStatus(event:MatSlideToggleChange) {
    this.storeService.updateStore(this.store._id, {active: event.checked}).subscribe() 

  }


  closeWhenClick() {
    if(this.currentScreenSize === 'Small' || this.currentScreenSize === 'XSmall') {
      this.sidenav.close()
    } 
  }

  ngAfterViewInit(): void {
    this.breakpointObserver
    .observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
    .pipe(takeUntil(this.destroyed))
    .subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          if(this.currentScreenSize === 'Small' || this.currentScreenSize === 'XSmall') {
            this.sidenav.close();
          } else {
            this.sidenav.open();
          }
        }
      }
    });
  }
}
