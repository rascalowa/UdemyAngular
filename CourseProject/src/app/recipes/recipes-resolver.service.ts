import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) { }

  //Resolver expects an observable as a return value and it waits for this observable to complete before it loads the route for which you added this resolver
  //the problem - when we dispatch an action we don't get back an observable  - then resolve would instantly resolve - load the route where the data is actually not there yet
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //overall observable
    return this.store.select('recipes').pipe(
      //take 1 to ensure we don't do this multiple times
      take(1),
      map(recipesState => {
        //either an empty array (if we haven't fetched  any recipes) or filled array - in next step i will add switchMap where I get my recipes
        return recipesState.recipes;
      }),
      switchMap(recipes => {
        //if we don't have recipes
        if (recipes.length === 0) {
          this.store.dispatch(new RecipesActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          //if we already have recipes
          return of(recipes);
        }
      })
    );
    // return this.dataStorageService.fetchRecipes();
    //ALL OVER MY HEAD... TO MAKE RESOLVER WORKING...
    //It is not an observable - we cant return this
    //we want to wait for the effect that is triggered by that action to complete

    //listening to specific action to occur to complete or trigger this observable - my SET RECIPES ACTION - then I know my recipes are there
  }
}
