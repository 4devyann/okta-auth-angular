import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate:[OktaAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  {
    path: '', redirectTo:'/welcome', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
