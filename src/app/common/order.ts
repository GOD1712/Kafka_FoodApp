import { OrderItem } from "./order-item";
import { User } from "./user";

export class Order {
    constructor(
        public user: User,
        public orderItems: OrderItem[]
    ) { }
}
