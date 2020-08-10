import { Injectable } from '@angular/core';
import Salary from './salary';

@Injectable()
export default class User {
  constructor(salary: Salary) {
    console.log('user');
  }
}
