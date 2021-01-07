import { Injectable } from '@angular/core';
import { Ingredient } from './shopping-list/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients : Ingredient[] = [
    new Ingredient('Apples', 4),
    new Ingredient('Oranges', 2),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  // constructor() { }
}
