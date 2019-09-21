import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent} from "./components/register/register.component";
import { AuthGuard } from "./helpers/auth.guard";
import {IssueListComponent} from "./components/issue-list/issue-list.component";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'issues', component: IssueListComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
