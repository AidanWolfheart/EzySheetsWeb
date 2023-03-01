import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '../models/googleAuth.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: SocialAuthService,
              private chatService: ChatService,
              private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      let googleAuth: GoogleAuth = {
        token: user.idToken
      };

      this.chatService.send(googleAuth).subscribe(
        (data) => {
          console.log("got data: ", data.token)
        }
      )
    });
  }

  signOut(){
    this.authService.signOut();
  }
}
