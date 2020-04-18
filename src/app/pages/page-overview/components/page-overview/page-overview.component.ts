import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {ProductService} from '../../services/product/product.service';
import {map} from 'rxjs/operators';
import {CustomerService} from '../../services/customer/customer.service';
import {Customer} from '../../interfaces/customer';

import {AuthService} from '../../../../core/auth/services/auth.service';
import {Product} from '../../interfaces/product';

@Component({
    selector: 'app-page-overview',
    templateUrl: './page-overview.component.html',
    styleUrls: ['./page-overview.component.scss']
})
export class PageOverviewComponent implements OnInit {
    public customer$: Observable<Customer>;

    public availableProducts$: Observable<Product[]>;
    public customerProducts$: Observable<Product[]>;

    public constructor(private customerService: CustomerService,
                       private productService: ProductService,
                       private authService: AuthService) {
    }

    public ngOnInit(): void {
        this.customer$ = this.customerService.customerWithMembership$;
        const membershipLevel$: Observable<number> = this.customer$.pipe(map(customer => customer.membership.level));
        const customerAge$: Observable<number> = this.customer$.pipe(map(customer => +customer.age));
        const selectedInsurances$: Observable<string[]> = this.customer$.pipe(map(customer => customer.selected_insurances));

        this.customerProducts$ = combineLatest([
            selectedInsurances$,
            this.productService.productsWithMembership$,
            customerAge$
        ]).pipe(
            map(([selectedInsurances, products, age]) => products
                .filter(product => selectedInsurances.indexOf(product.name) > -1)
                .map(product => ({
                    ...product,
                    prices: product.prices ? product.prices.filter(price => age >= price.minAge && age <= price.maxAge) : null
                }))
            )
        );

        const unselectedProducts$ = combineLatest([
            this.productService.productsWithMembership$,
            this.customerProducts$,
        ]).pipe(
            map(([products, customerProducts]) => products.filter(product =>
                !customerProducts.some(customerProduct => customerProduct.name === product.name))
            )
        );

        this.availableProducts$ = combineLatest([
            unselectedProducts$,
            membershipLevel$,
            customerAge$
        ]).pipe(
            map(([products, membershipLevel, age]) => products
                .filter(product => membershipLevel >= product.availability.level)
                .map(product => ({
                    ...product,
                    prices: product.prices ? product.prices.filter(price => age >= price.minAge && age <= price.maxAge) : null
                }))
                .filter(product => product.prices ? product.prices.length > 0 : true)
            )
        );
    }
}
