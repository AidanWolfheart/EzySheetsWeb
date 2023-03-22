import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  signedIn : boolean = false;
  
  constructor(private chatService: ChatService,
    private router: Router) { }

  ngOnInit() {
    this.chatService.isSignedIn().then(response => 
      {
        if (response.creds == true){
        this.signedIn = true;
        }else{
        this.signedIn = false;
        }
      }
      );
  }
}
