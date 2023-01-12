import { Component, OnInit } from '@angular/core';
import { Observable,  } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/components/comfirm/confirm.component';
import { Store } from 'src/app/shared/models/store';
import { Menu } from 'src/app/shared/models/menu';
import { MenusService } from './menus.service';
import { AddMenusComponent } from '../modals/add-menus/add-menus.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EditMenusComponent } from '../modals/edit-menus/edit-menus.component';

@Component({
  selector: 'app-list-menus',
  templateUrl: './list-menus.component.html',
  styleUrls: ['./list-menus.component.scss'],
})


export class ListMenusComponent implements OnInit {
  public menus$: Observable<Menu[]> | undefined;
  private confirmDialogRef!: MatDialogRef<ConfirmComponent> | null;
  store: Store

  constructor(
    private menusService: MenusService,
    public _matDialog: MatDialog,
    public router: Router,
    private _location: Location,
    private route: ActivatedRoute
  ) {
    this.store = this.route.snapshot.root.firstChild?.firstChild?.data['store'] as Store;
    
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
     this.loadMenus();
  }

  loadMenus() {
    this.menus$ = this.menusService.getStoreMenus(this.store._id)
  }

  delete(index:number, id:any) {
    this.confirmDialogRef = this._matDialog.open(ConfirmComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.title = 'Delete Menu?';
    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this menu?';
    this.confirmDialogRef.componentInstance.confirmButton = 'Delete';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.menusService.deleteMenu(index, id).subscribe(() => {
          this.loadMenus();
        })
      }
      this.confirmDialogRef = null;
    });
  }

  addMenu() {
    let addStoreForm = this._matDialog.open(AddMenusComponent, {
      disableClose: false,
      data: {storeId: this.store._id}
    });
    addStoreForm.afterClosed().subscribe(result => {
      
       if (result) {
        this.loadMenus();
       }
    });
  }

  openEdit(menu:Menu) {
    let addStoreForm = this._matDialog.open(EditMenusComponent, {
      disableClose: false,
      data: {storeId: this.store._id, menu}
    });
    addStoreForm.afterClosed().subscribe(result => {
      
       if (result) {
        this.loadMenus();
       }
    });
  }

  viewMenu(menuId:string) {
   this.router.navigate(['../', menuId, 'details' ])
  }


goBack() {
  this._location.back()
}




}

