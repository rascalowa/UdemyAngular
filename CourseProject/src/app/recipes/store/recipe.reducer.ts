import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
}

export function recipeReducer(state = initialState, action: RecipesActions.RecipesActions) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        //old list of recipes plus add a new one
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.UPDATE_RECIPE:
      //first find the recipe, then copy, then change, then copy list of recipes, then replace the updated recipe list
      const updatedRecipe = {
        //copy of that old recipe
        ...state.recipes[action.payload.index],
        //... - extract all the properties from that new recipe
        //and merge the into this object - my copy of the old recipe - this will overwrite old one
        ...action.payload.newRecipe
      };

      //copy old recipe list
      const updatedRecipes = [...state.recipes];
      //select the right recipe and overwrite that element in recipes list
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        //filter will always return a new list
        recipes: state.recipes.filter((recipe, index) => {
          //if index does not match, then we want to have it in our new list
          return index !== action.payload
        })
      };
    default:
      return state;
  }
}
