import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AppState } from '../../app.reducer';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }]
  };
  public doughnutChartType: ChartType = 'doughnut';


  constructor(private store: Store<AppStateWithIngreso>) { }

  ngOnInit() {
    this.store.select('ingresosEgresos').subscribe(({ items }) => this.generarEstadistica(items));
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.totalIngresos = 0;
    this.totalEgresos = 0;

    for (let item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }
    this.doughnutChartData.datasets[0].data[0] = this.totalIngresos;
    this.doughnutChartData.datasets[0].data[1] = this.totalEgresos;
  }



}
