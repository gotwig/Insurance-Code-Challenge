interface Price {
    currency: string;
    minAge: number;
    maxAge: number;
    price: string; // Take Care! German notation! this should be float/number not a comma string. @TODO: Refactor backend
    label: string;
}
