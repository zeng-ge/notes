import { NgModule } from "@angular/core";
import { ModuleComponent } from '../components/module.component';

@NgModule({
    declarations: [
        ModuleComponent
    ],
    exports: [
        ModuleComponent
    ]
})
export class ShareModule{}