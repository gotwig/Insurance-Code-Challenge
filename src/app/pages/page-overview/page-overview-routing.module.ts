import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageOverviewComponent} from './components/page-overview/page-overview.component';
import {AuthGuard} from '../../core/auth/services/auth.guard';


const routes: Routes = [{
    path: '',
    component: PageOverviewComponent,
    canActivate: [AuthGuard]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageOverviewRoutingModule {
}
