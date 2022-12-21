import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;
  private _user!: User | null;

  get user() {
    return { ...this._user };
  }

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore, private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      if (fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges().subscribe((firestoreUser: any) => {
          const user = User.fromFirebase(firestoreUser);
          this._user = user;
          this.store.dispatch(authActions.setUser({ user }))
          this.store.dispatch(ingresoEgresoActions.unSetItems());
        })
      } else {
        this._user = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch(authActions.unSetUser())
      }

    })
  }


  createUser(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user!.uid, nombre, user!.email)
        return this.firestore.doc(`${user!.uid}/usuario`).set({ ...newUser })
      })
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logOut() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }
}
