import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./pages/page-login/page-login.module').then(m => m.PageLoginModule)
    },
    {
        path: '',
        loadChildren: () => import('./pages/page-overview/page-overview.module').then(m => m.PageOverviewModule)
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
