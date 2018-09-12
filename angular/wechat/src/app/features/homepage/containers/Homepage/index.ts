import { Component, ViewEncapsulation } from '@angular/core'
import { FormButton } from '../../../../components/FormButton';

@Component({
  selector: 'homepage',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Homepage{
  buttonText: String = 'input & output'
  buttonDesc: String = 'ddddd'
  onClick(message: string): void {
    console.log('output', message)
  }
  mouseDown(){
    console.log('mouse down')
  }
  clickParent(){
    this.buttonDesc = this.buttonDesc + '1'
    console.log('parent')
  }
  clickChild($event){
    console.log('child')
    $event.stopPropagation()//禁止冒泡
    return false//阻止默认行为
  }
}
