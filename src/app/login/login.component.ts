
import { APP_BASE_HREF } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private chatService: ChatService,
              private router: Router) { }

  ngOnInit() {
    this.chatService.authorize().then( response =>
      {
        location.href = response.url;
      }
    )
  }

 }
