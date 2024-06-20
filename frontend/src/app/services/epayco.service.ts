import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EpaycoTransaction } from '../model/epayco-transaction';

@Injectable({
  providedIn: 'root'
})
export class EpaycoService {
  configUrl = 'https://secure.epayco.co/validation/v1/reference/';
  constructor(
  private http: HttpClient,
  ) { }

 ngOnInit() {

 }
  getTransactionResponse(refPayco: string) {
  return this.http.get<EpaycoTransaction>(this.configUrl+refPayco);
}
}
