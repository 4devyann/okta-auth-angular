import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';

import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';

import authConfig from './config/auth-config'
import { OktaAuth } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth(authConfig.oidc);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule
  ],
  providers: [
    {
      provide: OKTA_CONFIG, 
      useValue: {
        oktaAuth,
        onAuthRequired: ( injector: Injector ) => {
          
          const router = injector.get(Router);
          
          router.navigate(['/login']);
        }
      } 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
