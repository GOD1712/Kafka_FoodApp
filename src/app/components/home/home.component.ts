import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItem } from '../../common/order-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isClicked: boolean = false;
  foodItems: OrderItem[] = [
    new OrderItem(199, "Burger", 0, 100),
    new OrderItem(119, "Nuggets", 0, 40),
    new OrderItem(176, "Chicken", 0, 90),
    new OrderItem(110, "Pizza", 0, 300),
    new OrderItem(125, "Eclair", 0, 20),
    new OrderItem(100, "Wings", 0, 150),
  ];

  foodItemImages: string[] = [
    "../../../assets/images/dish-1.png",
    "../../../assets/images/dish-2.png",
    "../../../assets/images/dish-3.png",
    "../../../assets/images/dish-4.png",
    "../../../assets/images/dish-5.png",
    "../../../assets/images/dish-6.png",
  ];

  cartItems: OrderItem[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addItem(item: OrderItem) {
    this.isClicked = true;
    if (this.cartItems.length != 0) {
      let foundItemInCart = this.cartItems.find(itm => itm.itemId == item.itemId);
      item.quantity += 1;
      if (foundItemInCart == undefined) {
        this.cartItems.push(item);
      }
    }
    else {
      item.quantity += 1;
      this.cartItems.push(item);
    }
    console.log(this.cartItems);
  }

  removeItem(item: OrderItem) {
    if (this.cartItems.length != 0) {
      let foundItemInCart = this.cartItems.find(itm => itm.itemId == item.itemId);
      if (foundItemInCart != undefined) {
        foundItemInCart.quantity -= 1;
        if (foundItemInCart.quantity == 0) {
          this.cartItems.splice(this.cartItems.indexOf(foundItemInCart), 1);
        }
      }
    }
    console.log(this.cartItems);
  }

  checkout() {
    sessionStorage.setItem("orderItems", JSON.stringify(this.cartItems));
    this.router.navigateByUrl("/checkout");
  }

}
