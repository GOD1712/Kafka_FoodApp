import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/common/address';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { User } from 'src/app/common/user';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  orderItems: OrderItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0.0;

  constructor(private formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      user: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        contactNo: ['']
      }),
      address: this.formBuilder.group({
        buildingDetails: [''],
        street: [''],
        city: [''],
        pinCode: ['']
      })
    }
    );

    let orderItemsStr = sessionStorage.getItem("orderItems");
    if (orderItemsStr != null) {
      this.orderItems = JSON.parse(orderItemsStr);
    }

    this.computeTotals(this.orderItems);
  }

  computeTotals(orderItems: OrderItem[]) {
    for (let item of orderItems) {
      this.totalQuantity += item.quantity;
      this.totalPrice += (item.price * item.quantity);
    }
  }

  onSubmit() {
    let userFormDetails = this.checkoutForm.get("user")?.value;
    let addressFormDetails = this.checkoutForm.get("address")?.value;
    let userAddress: Address = new Address(
      addressFormDetails.buildingDetails,
      addressFormDetails.street,
      addressFormDetails.city,
      addressFormDetails.pinCode
    );
    let user: User = new User(
      userFormDetails.firstName,
      userFormDetails.lastName,
      userFormDetails.contactNo,
      userAddress
    );

    let order: Order = new Order(user, this.orderItems);
    console.log(order);
    this.checkoutService.sendOrderData(order).subscribe(
      (data) => {
        alert(`Your order tracking number is ${data}`);
        this.router.navigateByUrl("/home");
      }
    );
    this.checkoutForm.reset();
    sessionStorage.clear();
  }

}
