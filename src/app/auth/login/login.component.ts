import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  loginUser() {
    if (this.loginForm.invalid) { return }

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading(null)

      }
    });

    const { correo, password } = this.loginForm.value;
    this.authService.loginUser(correo, password)
      .then(credentials => {
        Swal.close();
        this.router.navigate(['/'])
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
  }
}
