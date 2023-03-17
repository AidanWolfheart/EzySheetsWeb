import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  signedIn : boolean = false;
  
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.isSignedIn().subscribe(response => 
      {
console.log(response);

        if (response){
        this.signedIn = true;
      }else{
        this.signedIn = false;
      }});
  }
}
