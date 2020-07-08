import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Beet green soup',
      'Very tasty soup made from beet leaves',
      'https://upload.wikimedia.org/wikipedia/commons/b/b3/Hyves_logo.png'
    ),
  ];

  constructor() {}

  ngOnInit() {}
}
