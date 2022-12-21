import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as ui from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent implements OnDestroy {

  ingresoForm: FormGroup;
  type: string = 'ingreso';
  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) {
    this.loadingSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
    this.ingresoForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    })
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  save() {
    if (this.ingresoForm.invalid) { return }

    const { descripcion, monto, uid } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.type, uid);

    this.ingresoEgresoService.createIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        this.store.dispatch(ui.isLoading());
        Swal.fire('Registro creado', descripcion, 'success')
      })
      .catch(error => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', error.message, 'error')
      })
  }

}
