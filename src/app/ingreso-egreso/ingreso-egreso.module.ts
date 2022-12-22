//Modules 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

import { NgChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';

//Components
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

//Pipe
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';

//NGRX
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

const components = [DetalleComponent, EstadisticaComponent, IngresoEgresoComponent, DashboardComponent, OrdenIngresoPipe];
const modules = [CommonModule, NgChartsModule, ReactiveFormsModule, SharedModule, DashboardRoutesModule, StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer)];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components]
})
export class IngresoEgresoModule { }
