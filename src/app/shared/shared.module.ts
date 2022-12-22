import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';


const components = [FooterComponent, NavbarComponent, SidebarComponent];
const modules = [CommonModule, RouterModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components]
})
export class SharedModule { }
