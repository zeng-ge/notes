import { testA } from './moduleA'
import { testB } from './moduleB'
testA()
testB()

export default function entry(){
  console.log('entry')
}