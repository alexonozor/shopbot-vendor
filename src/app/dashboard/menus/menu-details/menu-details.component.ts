import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, tap } from 'rxjs';
import { Store } from 'src/app/shared/models/store';
import { Location } from '@angular/common';
import { Menu } from 'src/app/shared/models/menu';
import { MenuService } from './menu.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/components/comfirm/confirm.component';
import { AddItemToMenuComponent } from '../modals/add-item-to-menu/add-item-to-menu.component';
import { Product } from 'src/app/shared/models/product';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss']
})
export class MenuDetailsComponent implements OnInit {
  store!: Store;
  menu!: Menu
  menu$!: Observable<Menu>
  storeId!: string;
  foods!: Product[];
  confirmDialogRef!: MatDialogRef<ConfirmComponent>;
  menuId:string;


  constructor(
    public _matDialog: MatDialog,


    private storeService: StoreService,
    private menuService: MenuService,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.menuId = this.route.snapshot.params['menuId']
    this.getMenu(this.menuId)
  }


  ngOnInit(): void {
    this.store = this.route.snapshot.root.firstChild?.firstChild?.data['store'] as Store;
  }

  getMenu(menuId:string) {
    this.menu$ = this.menuService.getMenu(menuId).pipe(tap((menu) => this.menu = menu))
  }

  goBack() {
    this._location.back();
  }

  addTimeToMenu() {
    let addToComponent = this._matDialog.open(AddItemToMenuComponent, {
      disableClose: false,
      panelClass: 'fullscreen-dialog',
      data: { storeId: this.store._id, menuId: this.menuId, food: this.foods, pageType: 'new' }
    });
    addToComponent.afterClosed().subscribe(result => {
      if (result) {
        this.getMenu(this.menuId) 
      }
    });
  }

  removeFood(food:Product, index:number) {
    this.confirmDialogRef = this._matDialog.open(ConfirmComponent, {
      disableClose: false,
    });
    this.confirmDialogRef.componentInstance.title = 'Delete Item?';
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this item from menu?';
    this.confirmDialogRef.componentInstance.confirmButton = 'Delete';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.menu.foods.splice(index, 1);
        this.menuService.removeFoodToMenu(food._id, this.menuId).subscribe((data) => {})
      }
    });
  }

  edit(product: Product) {
    let addToComponent = this._matDialog.open(AddItemToMenuComponent, {
      disableClose: false,
      panelClass: 'fullscreen-dialog',
      data: { storeId: this.store._id, menuId: this.menuId, food: this.foods, product, pageType: 'edit' }
    });
    addToComponent.afterClosed().subscribe(result => {
      if (result) {
        this.getMenu(this.menuId)
      }
    });
  }

}
