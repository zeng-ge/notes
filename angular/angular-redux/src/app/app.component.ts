import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { System } from './ngxs/system/action';
import { SystemState, SystemStateModel } from './ngxs/system/state';
import { Observable } from 'rxjs';
import { Store as ReduxStore } from './redux/store'
import { UserAction, UserState } from './states/user.state';
import { select } from './redux/decorators/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  @Select(SystemState.user) user$: Observable<SystemStateModel>;
  user:any;
  reduxUser:any;

  @select(UserState.User) reduxUser$: Observable<any>
  constructor(private store: Store, private reduxStore: ReduxStore){}
  ngOnInit(): void {
    this.user$.subscribe(system => {
      this.user = {...system}
    })

    setTimeout(() => {
      this.store.dispatch(new System.User())
    }, 2000)

    this.reduxStore.dispatch(new UserAction.SetUser('sky', 20))
    // this.reduxStore.select(root => root.user).subscribe(user => this.reduxUser = user)

    this.reduxUser$.subscribe(user => this.reduxUser = user)
  }
}
