<<<<<<< HEAD
import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';
=======
>>>>>>> a91fc7526995f4c0bae064159859458534cd7396
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
<<<<<<< HEAD
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';
import { UnlessDirective } from './unless.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective
=======

@NgModule({
  declarations: [
    AppComponent
>>>>>>> a91fc7526995f4c0bae064159859458534cd7396
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
