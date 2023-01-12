import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from 'src/app/shared/models/menu';

@Injectable()
export class MenuService {
   
    private hostServer: string = environment.hostServer;
    constructor(
        private _httpClient: HttpClient
    ) {}

    getMenu(menuId:string): Observable<Menu> {
      return this._httpClient.get<Menu>(`${this.hostServer}/menus/${menuId}`)
    }

    updateMenu(menuId:string, params: Menu): Observable<any> {
        return this._httpClient.put(`${this.hostServer}/menus/${menuId}`, params)
    }

    addFoodToMenu(foodId: string, menuId: string): Observable<any> {
        return this._httpClient.post(`${this.hostServer}/menus/add/food`, { foodId, menuId })
    }

    removeFoodToMenu(foodId: string, menuId: string): Observable<any> {
        return this._httpClient.delete(`${this.hostServer}/menus/remove/food`, {body: { foodId, menuId }})
    }

    updateStatus(menuId:string, userId:string, params: any): Observable<any> {
        return this._httpClient.put(`${this.hostServer}/menus/${menuId}/status/${userId}`, params)
    }


    addMenu(menu: Menu): Observable<any> {
        return this._httpClient.post(`${this.hostServer}/menus`, menu)
    }
}
