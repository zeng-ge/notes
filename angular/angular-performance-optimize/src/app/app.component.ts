import { Component, DoCheck, OnInit, NgZone, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Store } from '@ngxs/store';
import { System } from './ngxs/system/action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'angular-performance-optimize';
  count = 0;
  takeUtilDestroy = true;
  formControl: FormControl;

  storeName: string;
  constructor(
    private ngZone: NgZone, 
    private cdr: ChangeDetectorRef, 
    private applicationRef: ApplicationRef,
    private store: Store
  ){
    this.formControl = new FormControl()
  }
  ngOnInit(): void {
    // 什么代码都不加，angular初始化会tick 2次
    // this.runInAngular()
    // this.runOutsideAngular();

    this.store.subscribe(state => { //没有subscribe的时dispatch不会触发tick
      this.storeName = state.system.name
    })

    this.store.dispatch(new System.MergeMacroTasks())  //只触发了一次tick
  }

  runInAngular(){
    console.log('in angular start') // tick 触发3次，每次timeout一次，最后一次的promise是microtask并且是在macrotask内触发的
    this.sendRequests().then(() => {
      console.log('in angular end')
    })
  }

  runOutsideAngular(){
    console.log('runOutsideAngular start') // 人工触发tick一次
    this.ngZone.runOutsideAngular(() => {
      this.sendRequests().then(() => {
        console.log('runOutsideAngular end')
        this.applicationRef.tick()
      })
    })
  }

  async sendRequests() {
    await this.httpRequest()
    await this.httpRequest()
    await this.httpRequest()
  }

  httpRequest() {
    return new Promise((resole,reject) => {
      setTimeout(() => {
        resole()
      }, 10)
    })
  }
  
  public ngDoCheck(): void {
    console.log('app component =>', this.count++)
  }

  onClick(){
    this.takeUtilDestroy = false;
  }
}
