export interface productInfo {
  amount: number;
  price: number;
  currency: string;
}

export interface ProductResponse {
    name: string;
    availability: string;
    prices?: Price[];
    info?: productInfo
    type: string;
}
