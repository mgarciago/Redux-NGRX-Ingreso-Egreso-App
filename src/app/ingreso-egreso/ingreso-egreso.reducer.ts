import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import * as ingresoActions from './ingreso-egreso.actions';

export interface State {
    items: IngresoEgreso[];
}

export interface AppStateWithIngreso extends AppState {
    ingresosEgresos: State;
}

export const initialState: State = {
    items: [],
}

export const ingresoEgresoReducer = createReducer(initialState,

    on(ingresoActions.setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(ingresoActions.unSetItems, state => ({ ...state, items: [] })),

);

