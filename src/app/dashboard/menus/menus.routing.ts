import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMenusComponent } from './list/list-menus.component';
import { MenusComponent } from './menus.component';
import { MenuDetailsComponent } from './menu-details/menu-details.component';


const routes: Routes = [
  { 
    path: '', component: MenusComponent,
    children: [
        { path: 'list', component: ListMenusComponent  },
        { path: ':menuId/details', component: MenuDetailsComponent  },
        {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MenusRoutingModule { }
