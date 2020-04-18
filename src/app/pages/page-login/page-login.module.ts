import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PageLoginRoutingModule} from './page-login-routing.module';
import {PageLoginComponent} from './components/page-login/page-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [PageLoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    PageLoginRoutingModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class PageLoginModule {
}
