import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/services/auth.service";
import {Observable} from "rxjs";
import {Customer} from "../../../pages/page-overview/interfaces/customer";
import {CustomerService} from "../../../pages/page-overview/services/customer/customer.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public customer$: Observable<Customer>;

  @Input() public mobile = false;

  constructor(private authService: AuthService, private customerService: CustomerService) { }

  ngOnInit() {
    this.customer$ = this.customerService.customerWithMembership$;
  }

  logout() {
    this.authService.logout();
  }

}
