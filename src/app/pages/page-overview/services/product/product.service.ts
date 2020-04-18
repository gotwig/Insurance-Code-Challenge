import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';
import {MembershipService} from '../membership/membership.service';
import {combineLatest, Observable} from 'rxjs';
import {Product} from '../../interfaces/product';
import {ProductResponse} from '../../interfaces/product-response';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private readonly productsUrl = './assets/products.json';

    public products$ = this.http.get<{ [key: string]: ProductResponse }>(this.productsUrl).pipe(shareReplay(1));
    public productsWithMembership$: Observable<Product[]> = combineLatest([
        this.products$,
        this.membershipService.memberShips$
    ]).pipe(
        map(([products, memberships]) => Object.keys(products).map(productKey => ({
            ...products[productKey],
            name: productKey,
            availability: memberships.find(membership => membership.type === products[productKey].availability)
                || MembershipService.everyOne
        }) as Product)),
        shareReplay(1)
    );

    constructor(private http: HttpClient,
                private membershipService: MembershipService) {
    }
}
