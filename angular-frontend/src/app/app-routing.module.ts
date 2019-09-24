import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent} from "./components/register/register.component";
import { AuthGuard } from "./helpers/auth.guard";
import {IssueListComponent} from "./components/issue-list/issue-list.component";
import {IssueCreateComponent} from "./components/issue-create/issue-create.component";
import {IssueUpdateComponent} from "./components/issue-update/issue-update.component";

const routes: Routes = [
  { path: 'users', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'issues/:userId', component: IssueListComponent, canActivate: [AuthGuard]},
  { path: 'issues/:userId/add_issue', component: IssueCreateComponent, canActivate: [AuthGuard]},
  { path: 'issues/:userId/update/:issueId', component: IssueUpdateComponent, canActivate: [AuthGuard]},
  { path: 'issues/:userId/get/:issueId', component: IssueUpdateComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home ...changed to register
  { path: '**', redirectTo: '/login' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
