import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductsService implements Resolve<any>
{
  products!: Product[];
  onProductsChanged: BehaviorSubject<any>;
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
    this.onProductsChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getProducts()
      ]).then(
        () => {
          resolve(null);
        },
        reject
      );
    });
  }

  /**
   * Get products
   *
   * @returns {Promise<any>}
   */
  getProducts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${this.hostServer}/foods`)
        .subscribe((response: any) => {
          this.products = response;
          this.onProductsChanged.next(this.products);
          resolve(response);
        }, reject);
    });
  }

  deleteProduct(index:number, id:string) {
    this.products.splice(index, 1);
    this.onProductsChanged.next(this.products);
    this._httpClient.delete(`${this.hostServer}/foods/${id}`).subscribe()
  }



/**
 * Search products
 *
 * @returns {Observable<any>}
 */
  searchEntries(term:any) {
    return this._httpClient.get(`${this.hostServer}/foods/search-food?search=${term}`)
  }

  searchFood(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term))
    )
  }
}
