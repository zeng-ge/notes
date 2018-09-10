import { Component, ViewEncapsulation } from '@angular/core'
import { FormButton } from '../../../../components/FormButton';

@Component({
  selector: 'homepage',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Homepage{
  onClick(message: string): void {
    console.log('output', message)
  }
}
