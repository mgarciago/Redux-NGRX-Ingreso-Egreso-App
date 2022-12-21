import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {

  }

  createUser() {
    if (this.registerForm.invalid) { return }

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading(null)

      }
    });

    const { nombre, correo, password } = this.registerForm.value;
    this.authService.createUser(nombre, correo, password)
      .then(credentials => {
        Swal.close();
        this.router.navigate(['/'])
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
  }
}
