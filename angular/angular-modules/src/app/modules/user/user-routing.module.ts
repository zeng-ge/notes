import { Routes, RouterModule } from '@angular/router'
import { UserComponent } from './user.component'
import { NgModule } from '@angular/core'
const routes: Routes = [
    {
        path: '',
        component: UserComponent
    }
]

@NgModule({
    declarations: [UserComponent],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule{}