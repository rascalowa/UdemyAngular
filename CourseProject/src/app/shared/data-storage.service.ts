import { RecipeService } from './../recipe-book/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe-book/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-course-project-a6527.firebaseio.com/recipes.json', recipes).subscribe(
      response => { console.log(response) }
    );
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://ng-course-project-a6527.firebaseio.com/recipes.json')
      //map below in an rxjs operator
      .pipe(
        map(recipes => {
          //map below is called on array, so it's normal JS array method
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          });
        }),
        tap(
          recipes => {
            this.recipeService.setRecipes(recipes);
          })
      )
  }
}
