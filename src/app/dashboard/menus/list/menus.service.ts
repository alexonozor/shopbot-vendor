import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from 'src/app/shared/models/menu';

@Injectable()
export class MenusService  {

  menus: Menu[] = [];
  onMenusChanged: BehaviorSubject<any>;
  private hostServer: string = environment.hostServer;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
    private _httpClient: HttpClient
  ) {
    // Set the defaults
    this.onMenusChanged = new BehaviorSubject({});
  }

  getStoreMenus(storeId: string): Observable<Menu[]> {
   return this._httpClient.get<Menu[]>(`${this.hostServer}/menus/${storeId}/store/menus`)
  }

  deleteMenu(index: number, id: string) {
    this.menus.splice(index, 1);
    this.onMenusChanged.next(this.menus);
    return this._httpClient.delete(`${this.hostServer}/menus/${id}`)
  }

  createMenu(params: Menu) {
    return this._httpClient.post(`${this.hostServer}/menus`, params)
  }

  updateMenu(menuId: string, menusParams: Menu) {
    return this._httpClient.put(`${this.hostServer}/menus/${menuId}`, menusParams)
  }

}
