import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit{

  constructor(private chatService: ChatService) { }

  conversation: FormGroup;

  ngOnInit() {
    this.conversation = new FormGroup({
      prompt: new FormControl(''),
      response: new FormControl('')
    });

    this.conversation.controls['response'].disable();
  }

  send(conversation: FormGroup) {
    conversation.patchValue({'response': 'Generating...'});
    this.chatService.converse(conversation.value.prompt).then(
      response =>
      {
        conversation.patchValue({'response': response});
      }
    );
  }
}
