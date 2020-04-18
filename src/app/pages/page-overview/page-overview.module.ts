import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageOverviewRoutingModule} from './page-overview-routing.module';
import {PageOverviewComponent} from './components/page-overview/page-overview.component';
import {ProductComponent} from './components/product/product.component';
import {MatCardModule} from "@angular/material/card";
import {MatButton, MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [PageOverviewComponent, ProductComponent],
  imports: [
    CommonModule,
    PageOverviewRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class PageOverviewModule {
}
