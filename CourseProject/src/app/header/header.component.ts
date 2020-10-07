import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  //we need to manage by ourselves - unsubscribe when it is not required anymore
  ngOnInit() {
    //user is either null(not logged in) or exist (logged in)
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        console.log(!!user);
        //!!user = !user ? false : true;
        //  !user = if we don't have a user - true if user is null, false if we have user object -
        //  !!user = that is opposite of what we need - inverse our value .
      });
  }

  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes)
  }

  onFetchData() {
    //if we are not subscribing to fetch Data in the service (only RETURN), we need to subscribe here. If we don't care about response, we don't have to pass a function
    //this approach helps us in the RESOLVER
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

