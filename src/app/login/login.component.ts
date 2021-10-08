import { Component, OnInit } from '@angular/core';

import { OktaAuth, Tokens } from '@okta/okta-auth-js';
import * as OktaSignIn from '@okta/okta-signin-widget';

import authConfig from '../config/auth-config'

const DEFAULT_ORIGINAL_URI = window.location.origin;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signIn: any;

  constructor( public oktaAuth: OktaAuth ) {
    
    this.signIn = new OktaSignIn({

      baseUrl: authConfig.oidc.issuer.split('/oauth2')[0],
      clientId: authConfig.oidc.clientId,
      redirectUri: authConfig.oidc.redirectUri,
      authClient: oktaAuth,
      pxce: true
    });
  }

  ngOnInit() {

    const originalUri = this.oktaAuth.getOriginalUri();

    if (!originalUri || originalUri === DEFAULT_ORIGINAL_URI) {
      
      this.oktaAuth.setOriginalUri('/');
    }
    
    this.signIn.showSignInToGetTokens({
      
      el: '#sign-in-widget',
      scopes: authConfig.oidc.scopes

    }).then((tokens: Tokens) => {

      this.signIn.remove();

      this.oktaAuth.handleLoginRedirect(tokens);

    }).catch((err: any) => {

      throw err;
    });
  }

  ngOnDestroy() {

    this.signIn.remove();
  }

}
