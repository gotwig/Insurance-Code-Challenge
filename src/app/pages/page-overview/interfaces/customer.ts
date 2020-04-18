import {Membership} from './membership';

export interface Customer {
    name: string;
    membership: Membership;
    membership_type: string;
    age: string;
    selected_insurances: string[];
}
