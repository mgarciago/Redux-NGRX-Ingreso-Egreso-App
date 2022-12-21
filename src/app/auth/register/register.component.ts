import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as uiActions from '../../shared/ui.actions';
import { AppState } from '../../app.reducer';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AppState>) {

    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
    })
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  createUser() {
    if (this.registerForm.invalid) { return }

    this.store.dispatch(uiActions.isLoading())

    const { nombre, correo, password } = this.registerForm.value;
    this.authService.createUser(nombre, correo, password)
      .then(credentials => {
        this.store.dispatch(uiActions.stopLoading())
        this.router.navigate(['/'])
      })
      .catch(err => {
        this.store.dispatch(uiActions.stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
  }
}
