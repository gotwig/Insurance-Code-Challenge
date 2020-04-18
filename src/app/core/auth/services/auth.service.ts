import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CustomerResponse} from '../interfaces/CustomerResponse';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public customer$: Observable<CustomerResponse>;

  private readonly customerStorageKey = 'customer';
  private readonly authUrl = './assets/customers.json';
  private customerSubject: BehaviorSubject<CustomerResponse>;

  public constructor(private http: HttpClient,
                     private router: Router) {
    this.customerSubject = new BehaviorSubject<CustomerResponse>(this.getFromLocalStorage());
    this.customer$ = this.customerSubject.asObservable();
  }

  isLoggedIn(): boolean {
    if (this.customerSubject.getValue()) {
      return true;
    }
    return false;
  }

  public login(name: string, password: string): Observable<CustomerResponse> {
    return this.http.get<{ customers: CustomerResponse[] }>(this.authUrl).pipe(
      map(customersResponse => customersResponse.customers),
      map(customers => customers.find(customer => customer.name === name && customer.password === password)),
      map(customer => {
        if (customer) {
          return this.setCustomer(customer);
        } else {
          throw new Error('Wrong login credentials - Please try again');
        }
      })
    );
  }

  public logout() {
    localStorage.removeItem(this.customerStorageKey);
    this.customerSubject.next(null);
    this.router.navigate(['login']);
  }

  private setCustomer(customer: CustomerResponse): CustomerResponse {
    localStorage.setItem(this.customerStorageKey, JSON.stringify(customer));
    this.customerSubject.next(customer);
    return customer;
  }

  private getFromLocalStorage(): CustomerResponse | null {
    const storageCustomer = localStorage.getItem(this.customerStorageKey);
    return storageCustomer ? JSON.parse(storageCustomer) : null;
  }
}
