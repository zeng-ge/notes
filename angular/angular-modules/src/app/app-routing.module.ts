import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

const routes = [
    {
        path: 'user',
        loadChildren: () => import('./modules/user/user-routing.module').then(ngModule => {
            return ngModule.UserRoutingModule
        })
    },
    {
        path: 'user1',
        loadChildren: () => import('./modules/user1/user-routing1.module').then(ngModule => {
            return ngModule.UserRouting1Module
        })
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}