import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'Beet green soup',
      'Very tasty soup made from beet leaves',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Olivka_%28Novosibirsk_cafe%29_03.jpg/640px-Olivka_%28Novosibirsk_cafe%29_03.jpg',
      [
        new Ingredient('Beet Leaves', 3),
        new Ingredient('Sour Cream', 1),
        new Ingredient('Carrot', 2),
      ]
    ),
    new Recipe(
      'Chicken soup',
      'Best soup ever!',
      'https://p0.pikist.com/photos/845/1021/soup-chicken-soup-eat-food-court-cook-vegetables-delicious-noodles.jpg',
      [
        new Ingredient('Chicken Leg', 2),
        new Ingredient('Onion', 1),
        new Ingredient('Carrot', 3),
        new Ingredient('Parsley', 2),
      ]
    ),
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

}
