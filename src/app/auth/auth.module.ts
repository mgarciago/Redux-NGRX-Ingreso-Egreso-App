import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const components = [LoginComponent, RegisterComponent]
const modules = [CommonModule, ReactiveFormsModule, RouterModule]

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class AuthModule { }
