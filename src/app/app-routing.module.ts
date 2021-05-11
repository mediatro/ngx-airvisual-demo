import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardPageComponent} from './main/components/dashboard/dashboard-page/dashboard-page.component';
import {AuthRequiredGuard} from './guards/auth-required.guard';
import {LoginPageComponent} from './main/components/login/login-page/login-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthRequiredGuard]},
  {path: 'login', component: LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
