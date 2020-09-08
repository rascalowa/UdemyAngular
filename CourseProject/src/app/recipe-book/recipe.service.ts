import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Beet green soup',
  //     'Very tasty soup made from beet leaves',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Olivka_%28Novosibirsk_cafe%29_03.jpg/640px-Olivka_%28Novosibirsk_cafe%29_03.jpg',
  //     [
  //       new Ingredient('Beet Leaves', 3),
  //       new Ingredient('Sour Cream', 1),
  //       new Ingredient('Carrot', 2),
  //     ]
  //   ),
  //   new Recipe(
  //     'Chicken soup',
  //     'Best soup ever!',
  //     'https://p0.pikist.com/photos/845/1021/soup-chicken-soup-eat-food-court-cook-vegetables-delicious-noodles.jpg',
  //     [
  //       new Ingredient('Chicken Leg', 2),
  //       new Ingredient('Onion', 1),
  //       new Ingredient('Carrot', 3),
  //       new Ingredient('Parsley', 2),
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) { }

  //to overwrite fetched recipes from http request
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    //infroming our app that we have new recipes, like we do when updating or deleting
    this.recipesChanged.next(this.recipes.slice())
  }

  //DO NOT FORGET YOU ARE WORKING ON COPY!! FOLLOW THE CHANGES!!
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
