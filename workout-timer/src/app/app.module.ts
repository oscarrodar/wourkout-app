import { WorkoutEffects } from './store/workout/workout.effects';
import { TimerEffects } from './store/timer/timer.effects';
import { ComponentsModule } from './components/shared/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'; // Assuming Ionic is conceptually present

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// NgRx Imports
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [AppComponent], // AppComponent will need to be created
  imports: [
    BrowserModule,
    // IonicModule.forRoot(), // Conceptually including IonicModule
    AppRoutingModule, // AppRoutingModule will need to be created
    ComponentsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([TimerEffects, WorkoutEffects]), // Basic Effects module
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy } // Conceptually including Ionic's strategy
  ],
  // bootstrap: [AppComponent], // AppComponent would be bootstrapped
})
export class AppModule {}
