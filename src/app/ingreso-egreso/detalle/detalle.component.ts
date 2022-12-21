import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {

  ingresosEgresos!: IngresoEgreso[];

  constructor(private store: Store<AppState>) {
    this.store.select('ingresosEgresos')
      .subscribe(({ items }) => this.ingresosEgresos = items);
  }

  delete(uid: string) {
    console.log(uid);
  }

}
