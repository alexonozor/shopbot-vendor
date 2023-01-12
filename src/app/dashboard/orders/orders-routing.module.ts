import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { OrderResolver, OrdersResolver } from '../../shared/resolvers/orders.resolver';


const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: 'list',
        component: ListOrdersComponent,
        resolve: { orders: OrdersResolver }
      },
      {
        path: ':id/details',
        component: OrdersDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],


exports: [RouterModule]
})
export class OrdersRoutingModule { }
