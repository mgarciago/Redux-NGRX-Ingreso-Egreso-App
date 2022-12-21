import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  userSubs: Subscription;
  ingresosSubs!: Subscription;

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) {

    this.userSubs = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(({ user }) => {
        this.ingresosSubs = this.ingresoEgresoService.initIngresosEgresosListener(user!.uid)
          .subscribe((ingresosEgresosFB: IngresoEgreso[]) => {
            this.store.dispatch(ingresoEgresoActions.setItems({ items: ingresosEgresosFB }))
          })
      })
  }

  ngOnDestroy() {
    this.ingresosSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }

}
