import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { Homepage } from './containers/Homepage'
import { FormButton } from '../../components/FormButton';

const routes: Routes = [
  { path: '', component: Homepage },
  // { path: '', redirectTo: '/tabs/homepage', pathMatch: 'full' },
  { path: 'tabs/homepage', component: Homepage },
]

@NgModule({
  /**
   * 在最外层的module中声明FormButton后在Homepage里面还是无法使用，
   * 需要这该模块显示的声明，模块的声明并不会从上层module中继承
   * 可以定义一个公共模块，如
   * ComponentModule: {
   *  declarations: [FormButton],
   *  exports: [FormButton]
   * }
   * 然后在需要的Module里面单独导入
   */
  declarations: [Homepage, FormButton],
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
