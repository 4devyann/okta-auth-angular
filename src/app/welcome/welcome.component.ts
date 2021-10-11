import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  userName = '';
  token: any ;
  tdecode: any ;

  constructor(
    public authStateService: OktaAuthStateService,
    private oktaAuth : OktaAuth
  ) { }

  async ngOnInit() {

    const isAuthenticated = await this.oktaAuth.isAuthenticated();

    if (isAuthenticated) {

      const userClaims = await this.oktaAuth.getUser();
      this.token =  this.oktaAuth.getAccessToken();
      console.log(this.token);

      this.tdecode = jwt_decode(this.token);
      this.userName = userClaims.name as string;
    }
  }
}
