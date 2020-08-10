import { Component, ViewEncapsulation } from '@angular/core'
import { FormButton } from '../../../../components/FormButton';
import User from 'src/app/services/user';
import Salary from 'src/app/services/salary';

@Component({
  selector: 'homepage',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Homepage{
  buttonText: string = 'input & output'
  buttonDesc: string = 'ddddd'
  constructor(user: User, salary: Salary) {

  }
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
