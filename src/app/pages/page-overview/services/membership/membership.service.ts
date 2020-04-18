import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';
import {Membership} from '../../interfaces/membership';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MembershipService {
    public static everyOne: Membership = {type: 'everyone', level: 0};
    private readonly memberShipsUrl = './assets/memberships.json';

    public memberShips$: Observable<Membership[]> = this.http.get<{ membership: any[] }>(this.memberShipsUrl).pipe(
        map(response => response.membership[0]), // Need API Doku or someone to explain why this is an array of a "Map"
        map(memberships => Object.keys(memberships).map(membershipKey => ({
            ...memberships[membershipKey],
            type: membershipKey
        } as Membership))),
        shareReplay(1)
    );

    public constructor(private http: HttpClient) {
    }
}
