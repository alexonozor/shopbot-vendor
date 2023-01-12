import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { OrdersService } from 'src/app/shared/services/order.service';
import { forkJoin, map, Observable, tap } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { Store } from 'src/app/shared/models/store';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Socket } from 'ngx-socket-io';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  orders$!: Observable<[Order[], Order[], Order[], Order[]]>;
  newOrder!: Order[]
  pendingOrder!: Order[] 
  completedOrder!: Order[];
  cancelOrder!: Order[];
  store: Store
  public selectedTab = 0;

  constructor(
    public authService: AuthService,
    public router: Router,
    private orderService: OrdersService,
    public route: ActivatedRoute,
    public socket: Socket,
    private notificationService: NotificationsService
  ) {
     this.store = this.route.snapshot.parent?.data['store'] as Store;
  }

   ngOnInit(): void {
     this.getOrders()
     this.listenToNewOrders()
     this.route.queryParams.subscribe((params: any) => {
      this.selectedTab = params.tab || 0;
    });
   }

   listenToNewOrders() {
    this.orderService.selectedOrders.subscribe((order) => {
      console.log(order)
      if (order) {
        this.getOrders()
      }
    })
   }

   getOrders() {
    const newOrder = this.orderService.getStoreOrder({
      store: this.store._id,
      category: 'New'
    })

    const pending = this.orderService.getStoreOrder({
      store: this.store._id,
      category: 'Processing'
    })

    const completed = this.orderService.getStoreOrder({
      store: this.store._id,
      category: 'Complete'
    })

    const canceled = this.orderService.getStoreOrder({
      store: this.store._id,
      category: 'Cancel'
    })
     
    this.orders$ = forkJoin([newOrder, pending, completed, canceled]).pipe(tap((data) => {
      this.newOrder = data[0]
      this.pendingOrder = data[1]
      this.completedOrder = data[2]
      return data
    }))
   }
     
  public tabChanged(event: MatTabChangeEvent) {
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    queryParams['tab'] = event.index;
    this.router.navigate(['.'], { queryParams: queryParams, relativeTo: this.route });
  }


}


