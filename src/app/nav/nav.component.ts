import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public authStateService: OktaAuthStateService, private oktaAuth: OktaAuth) {

  }
  ngOnInit(): void {
    
  }

  async logout() {
    await this.oktaAuth.signOut();
  }

}
