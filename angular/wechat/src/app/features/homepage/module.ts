import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { Homepage } from './containers/Homepage'

const routes: Routes = [
  { path: '', component: Homepage },
  // { path: '', redirectTo: '/tabs/homepage', pathMatch: 'full' },
  { path: 'tabs/homepage', component: Homepage },
]

@NgModule({
  declarations: [Homepage],
  imports: [RouterModule.forRoot(routes)],
  /**
   * export之前必须先declaration
   * 为了让Homepage在AppModule的页面内部可以使用<homepage/>，
   * 必须将Homepage导出，否则在entry内是不能直接使用<homepage/>的
   * 所在在一个模块中定义了公其组件后，必须将其exports出去
   */
  exports: [RouterModule, Homepage]
})
export class HomepageModule{}
