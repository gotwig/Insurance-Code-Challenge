export interface CustomerResponse {
    name: string;
    membership_type: string;
    password: string;
    age: string; // why number tho? TODO: Ask Backend to reason or refactor
    selected_insurances: string[];
}
