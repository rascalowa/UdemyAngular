import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
// import { AuthInterceptorService } from './auth/auth-interceptor.service';
// import { RecipeService } from './recipes/recipe.service';
// import { RecipesModule } from './recipes/recipes.module'; // LazyLoading
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
// import { AuthModule } from './auth/auth.module';
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
  // providers: [LoggingService]
})
export class AppModule { }


// @NgModule({
//   declarations: [
//     AppComponent,
//     HeaderComponent,
//   ],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     AppRoutingModule,
//     //initialize global ngrx store
//     StoreModule.forRoot(fromApp.appReducer),
//     //here we need to pass an array of our effect classes
//     EffectsModule.forRoot([AuthEffects]),
//     // RecipesModule,
//     // ShoppingListModule,
//     // AuthModule,
//     SharedModule,
//     CoreModule
//   ],
//   // providers: [
//   //   LoggingService,
//   //   RecipeService,
//   //   {
//   //     provide: HTTP_INTERCEPTORS,
//   //     useClass: AuthInterceptorService,
//   //     multi: true
//   //   }
//   // ],
//   bootstrap: [AppComponent],
// })
// export class AppModule { }
