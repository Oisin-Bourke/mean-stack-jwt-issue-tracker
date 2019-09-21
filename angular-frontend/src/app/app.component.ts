import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { AuthenticationService } from "./services/authentication.service";
import { User } from "./models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-frontend';

  currentUser: User;

  constructor(
    private router: Router,
    private authenticateService: AuthenticationService
  ) {
    this.authenticateService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticateService.logout();
    this.router.navigate(['/login']);
  }
}
