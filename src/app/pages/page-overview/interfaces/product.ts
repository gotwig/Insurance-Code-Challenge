import {Membership} from './membership';

export interface productInfo {
    amount: number;
    price: number;
    currency: string;
}

export interface Product {
    name: string;
    availability: Membership;
    prices?: Price[];
    info?: productInfo;
    type: string;
}
