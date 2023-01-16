import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../common/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  url: string = "http://localhost:8083/api/kafka/order";

  constructor(private httpClient: HttpClient) { }

  sendOrderData(order: Order): Observable<string> {
    return this.httpClient.post(this.url, order, { responseType: "text" as const });
  }
}

