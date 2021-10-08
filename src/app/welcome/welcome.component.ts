import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  userName = '';
  
  constructor(
    public authStateService: OktaAuthStateService,
    private oktaAuth : OktaAuth
  ) {
  
  }

  async ngOnInit() {
    
    const isAuthenticated = await this.oktaAuth.isAuthenticated();
    
    if (isAuthenticated) {
      
      const userClaims = await this.oktaAuth.getUser();
      
      this.userName = userClaims.name as string;
    }
  }
}
