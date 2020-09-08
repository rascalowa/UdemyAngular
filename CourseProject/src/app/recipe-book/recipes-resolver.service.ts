import { DataStorageService } from '../shared/data-storage.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

//RESOLVER HELPS US TO PRELOAD SOME DATA
@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) { }

  //WANT TO HAVE ALL RECIPES
  //THE GOAL IS TO RETURN EITHER AN ARRAY OF RECIPES (we cant, we need to load them first), OR AN OBSERVALBE (that will in the end yield an array of recipes) <- that we can offer!
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //first check if we already have recipes, and only fetch if we don't!
    const recipes = this.recipesService.getRecipes();

    if (recipes.length === 0) {
      //I do not need to subscribe, resolve function do it for me
      return this.dataStorageService.fetchRecipes();
    } else {
      //when we have already some recipes, please do not overwrite my changes by fetching data from server
      return recipes;
    }


  }
}
//Thanks to resolver we are fetching data even if we have new added recipe
