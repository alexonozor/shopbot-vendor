import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService implements Resolve<any> {
  routeParams: any;
  product: any;
  onProductChanged: BehaviorSubject<any>;
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
    this.onProductChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    return new Promise((resolve, reject) => {

      Promise.all([
        this.getProduct()
      ]).then(
        () => {
          resolve(null);
        },
        reject
      );
    });
  }

  /**
   * Get product
   *
   * @returns {Promise<any>}
   */
  getProduct(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onProductChanged.next(false);
        resolve(false);
      }
      else {
        this._httpClient.get(`${this.hostServer}/foods/${this.routeParams.id}`)
          .subscribe((response: any) => {
            this.product = response;
            this.onProductChanged.next(this.product);
            resolve(response);
          }, reject);
      }
    });
  }

  /**
   * upload product
   *
   * @param formData
   * @returns {Promise<any>}
   */
  uploadPhoto(formData: any, id?: string): Observable<any> {
    return this._httpClient.post(`${this.hostServer}/foods/upload/${id}`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  /**
 * Save product
 *
 * @param product
 * @returns {Promise<any>}
 */
  saveProduct(product: any, id: any) {

    return this._httpClient.put(`${this.hostServer}/foods/${id}`, product)
     

  }

  /**
   * Add product
   *
   * @param product
   * @returns {Observable<any>}
   */
  addProduct(product: any): Observable<any> {
    return this._httpClient.post(`${this.hostServer}/foods`, product)
  }
}
