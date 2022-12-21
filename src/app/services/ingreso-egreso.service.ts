import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firesotre: AngularFirestore, private authService: AuthService) { }

  createIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    const uid = this.authService.user.uid;

    return this.firesotre.doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso })
      .then(() => console.log('exito'))
      .catch(err => console.warn(err))
  }

  initIngresosEgresosListener(uid: string): any {
    return this.firesotre.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })))
      )
  }
}
