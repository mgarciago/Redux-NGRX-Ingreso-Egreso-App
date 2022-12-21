import { createReducer, on } from '@ngrx/store';
import * as actions from './auth.actions';
import { User } from '../models/user.model';

export interface State {
    user: User | null;
}

export const initialState: State = {
    user: null,
}

export const authReducer = createReducer(initialState,
    on(actions.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
    on(actions.unSetUser, state => ({ ...state, user: null })),
);
