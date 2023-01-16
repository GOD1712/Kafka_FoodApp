import { Injectable } from '@angular/core';
import { OrderItem } from '../common/order-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: OrderItem[] = [];

  constructor() { }

  public getCartItems(): OrderItem[] {
    return this.cartItems;
  }

  public addItem(orderItem: OrderItem) {
    if (this.cartItems.length != 0) {
      let foundItem = this.cartItems.find(item => item.itemId == orderItem.itemId);
      if (foundItem != undefined) {
        foundItem.quantity += 1;
        return foundItem;
      }
      else {
        orderItem.quantity += 1;
        this.cartItems.push(orderItem);
      }
    }
    else {
      orderItem.quantity += 1;
      this.cartItems.push(orderItem);
    }
    return orderItem;
    console.log(this.cartItems);
  }

  public removeItem(orderItem: OrderItem) {
    if (this.cartItems.length != 0) {
      let foundItem = this.cartItems.find(item => item.itemId == orderItem.itemId);
      if (foundItem != undefined) {
        foundItem.quantity -= 1;
        if (foundItem.quantity == 0) {
          this.cartItems.splice(this.cartItems.indexOf(foundItem), 1);
        }
      }
    }
  }

  public emptyCart() {
    this.cartItems = [];
  }
}
