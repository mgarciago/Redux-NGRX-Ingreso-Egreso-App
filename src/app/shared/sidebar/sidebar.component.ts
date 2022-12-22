import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {

  public userName!: string | undefined;
  public userNameSubs!: Subscription;

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) {
    this.userNameSubs = this.store.select('user')
      .pipe(
        filter(({ user }) => user != null)
      )
      .subscribe(({ user }) => this.userName = user?.nombre)
  }

  ngOnDestroy() {
    this.userNameSubs.unsubscribe();
  }

  logout() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
