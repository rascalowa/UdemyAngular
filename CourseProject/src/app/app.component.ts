import * as fromApp from './store/app.reducer';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

import * as AuthActions from './auth/store/auth.actions'
import { LoggingService } from './logging.service';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService,
    //we inject hard coded value - no type needed
    //please look for globally provided value with this identifier, and inject this globl value to this class and store it in this platformId property
    @Inject(PLATFORM_ID) private platformId
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }

    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}


