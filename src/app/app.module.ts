import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';

//NGRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

//Modules
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';


import { AppComponent } from './app.component';



const components = [AppComponent]
const modules = [
  BrowserModule,
  AppRoutingModule,
  ReactiveFormsModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule,
  AngularFireAuthModule,
  StoreModule.forRoot(appReducers),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  AuthModule
]

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
