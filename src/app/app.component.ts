import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService} from "./core/auth/services/auth.service";
import {Observable} from "rxjs";
import {Customer} from "./pages/page-overview/interfaces/customer";
import {CustomerService} from "./pages/page-overview/services/customer/customer.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Anonymized Code Challenge';

  constructor(private authService: AuthService,  private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  isAuthenticated() {
    return this.authService.isLoggedIn();
  }
}


