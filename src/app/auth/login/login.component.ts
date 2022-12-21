import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as uiActions from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AppState>) {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
    })
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  loginUser() {
    if (this.loginForm.invalid) { return }

    this.store.dispatch(uiActions.isLoading());


    const { correo, password } = this.loginForm.value;
    this.authService.loginUser(correo, password)
      .then(credentials => {
        this.store.dispatch(uiActions.stopLoading());
        this.router.navigate(['/'])
      }).catch(err => {
        this.store.dispatch(uiActions.stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
  }
}
