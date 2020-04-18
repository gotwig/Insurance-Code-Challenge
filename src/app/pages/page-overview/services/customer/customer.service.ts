import {Injectable} from '@angular/core';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {MembershipService} from '../membership/membership.service';
import {combineLatest, Observable} from 'rxjs';
import {filter, map, shareReplay} from 'rxjs/operators';
import {Customer} from '../../interfaces/customer';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    public customer$ = this.authService.customer$;
    public customerWithMembership$: Observable<Customer> = combineLatest([this.customer$, this.membershipService.memberShips$]).pipe(
        filter(([customer, membership]) => !!customer),
        map(([customer, memberships]) => ({
            ...customer,
            membership: memberships.find(membership => membership.type === customer.membership_type),
        })),
        shareReplay(1)
    );

    public constructor(private authService: AuthService,
                       private membershipService: MembershipService) {
    }
}
