import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bank } from 'src/app/shared/models/bank';
import { Store } from 'src/app/shared/models/store';

@Injectable()
export class BankService implements Resolve<any> {
  routeParams: any;
  bank: any;
  onBankChanged: BehaviorSubject<any>;
  private hostServer: string = environment.hostServer;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
    private _httpClient: HttpClient,
  ) {
    // Set the defaults
    this.onBankChanged = new BehaviorSubject({});
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
        this.getBank()
      ]).then(
        () => {
          resolve(null);
        },
        reject
      );
    });
  }

  /**
   * Get bank
   *
   * @returns {Promise<any>}
   */
  getBank(): Promise<any> {
    return new Promise((resolve, reject) => {

      this._httpClient.get(`${this.hostServer}/banks/${this.routeParams.id}`)
        .subscribe((response: any) => {
          this.bank = response;
          this.onBankChanged.next(this.bank);
          resolve(response);
        }, reject);

    });
  }

  getStoreBank(store:Store): Observable<any> {
    return this._httpClient.get(`${this.hostServer}/banks/${store._id}/store`)
  }

  resolveBank({accountNumber, code}:any): Observable<any> {
    return this._httpClient.get(`${this.hostServer}/banks/resolve?accountNumber=${accountNumber}&code=${code}`)
  }

  getBanksLists(): Observable<any> {
    return this._httpClient.get(`${this.hostServer}/banks/paystack`)
  }

  getBanks(): Observable<any> {
    return this._httpClient.get(`${this.hostServer}/banks`)
  }

  addBank(bank:Bank): Observable<any> {
    return this._httpClient.post(`${this.hostServer}/banks`, bank)
  }

  updateBank(bank:Bank, id:string): Observable<any> {
    return this._httpClient.put(`${this.hostServer}/banks/${id}`, bank)
  }
}
