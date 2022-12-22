import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AppState } from '../../app.reducer';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {

  ingresosEgresos!: IngresoEgreso[];

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) {
    this.store.select('ingresosEgresos')
      .subscribe(({ items }) => this.ingresosEgresos = items);
  }

  delete(uidItem: string | undefined) {
    this.ingresoEgresoService.delete(uidItem)
      .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
      .catch(err => Swal.fire('Error', err.message, 'error'))
  }

}
