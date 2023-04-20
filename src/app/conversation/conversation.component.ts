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
  messages: any[] = [];
  activeScriptIdForm: FormGroup;
  activeScriptId: String;

  ngOnInit() {
    this.conversation = new FormGroup({
      prompt: new FormControl(''),
      response: new FormControl('')
    });

    this.activeScriptIdForm = new FormGroup({
      scriptID: new FormControl('')
    });

    this.conversation.controls['response'].disable();
    this.activeScriptId = "No active Scripts right now";

    var scriptId = this.getActiveScriptId();

    if(scriptId !== ''){
      this.activeScriptId = scriptId;
    }
  }

  send(conversation: any) {
    this.handleUserRequest(conversation.message, false);
    this.handleAIResponse("Thinking..", true)

    this.chatService.converse(conversation.message).then(
      response =>
      {
        this.messages.pop()
        this.handleAIResponse(response, true)
      }
    );
  }

  handleUserRequest(response: any, isReply: boolean) {
    console.log(`My response: ${response}`)
    var payload = {
      text: response,
      date: new Date(),
      reply: isReply,
      type: 'text',
      name: "User's Name",
      // avatar: 'https://i.gifer.com/no.gif',
    };
    this.messages.push(payload);
  }

  handleAIResponse(response: any, isReply: boolean) {
    console.log(`My response: ${response}`)
    var payload = {
      text: response,
      date: new Date(),
      reply: isReply,
      type: 'text',
      name: 'Google Sheet AI',
      // avatar: 'https://i.gifer.com/no.gif',
    };
    this.messages.push(payload);
  }

  get registerUsername() { return this.activeScriptIdForm.get('scriptID'); }

  getActiveScriptId() : any {
    this.chatService.getActiveScriptId().then(
      response=>
      {
        return response;
      }
    );
  }

  setActiveScriptId() {
    this.activeScriptId = this.registerUsername?.value;
    this.chatService.sendActiveScriptId(this.activeScriptId);
  }
}
