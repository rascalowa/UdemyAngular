import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  //change type to observable
  //generic type which will in the end yield an object with an ingredients[] which will the hold an array of ingredients (the same data format of our store!)
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  //that will break our template(we do loop through our ingredients in html)
  private subscription: Subscription;

  constructor(
    private store: Store<fromShoppingList.AppState>
    //with that store injected we can use it
  ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList')
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
