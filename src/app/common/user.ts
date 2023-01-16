import { Address } from "./address";

export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public contactNo: string,
        public address: Address
    ) { }
}
