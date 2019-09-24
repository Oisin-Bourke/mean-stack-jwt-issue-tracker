import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User} from "../../models/user.model";
import { AuthenticationService} from "../../services/authentication.service";
import { UserService } from "../../services/user.service";

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];
  displayedColumns = ['createdDate','username','firstName', 'lastName', 'company', 'telephone', 'email', 'actions'];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }
}
