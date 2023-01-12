import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material';
import { MenusRoutingModule } from './menus.routing';
import { RouterModule } from '@angular/router';
import { MenusComponent } from './menus.component';
import { AddMenusComponent } from './modals/add-menus/add-menus.component';
import { EditMenusComponent } from './modals/edit-menus/edit-menus.component';
import { ListMenusComponent } from './list/list-menus.component';
import { MenusService } from './list/menus.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuDetailsComponent } from './menu-details/menu-details.component';
import { AddItemToMenuComponent } from './modals/add-item-to-menu/add-item-to-menu.component';
import { MenuService } from './menu-details/menu.service';
import { ProductService } from 'src/app/shared/services/product.service';

@NgModule({
  declarations: [
    MenusComponent,
    ListMenusComponent,
    AddMenusComponent,
    EditMenusComponent,
    MenuDetailsComponent,
    AddItemToMenuComponent
  ],
  imports: [
  CommonModule,
    MaterialModule,
    RouterModule,
    MenusRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule
  ],
  providers: [
    MenusService,
    StoreService,
    MenuService,
    ProductService
  ]
})
export class MenusModule { }