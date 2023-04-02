import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, from, Observable, throwError } from 'rxjs';
import { GoogleAuth } from '../models/googleAuth.model';
import { ChatResponse } from '../models/chatResponse.model';

const httpOptions = {
  crossOriginIsolated: true,

  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'charset': 'UTF-8'
    })
};

@Injectable({
    providedIn: 'root'
  })
export class ChatService {
  constructor(private http: HttpClient) { }
  

  send(googleAuth: GoogleAuth) : Observable<GoogleAuth>{
    return this.http.post<GoogleAuth>('http://127.0.0.1:5000/chat/send-auth', googleAuth).pipe();
  }

  // converse(message: string) : Observable<any>{
  //   return this.http.post('http://127.0.0.1:5000/chat/conversation', {userid:'1', message: message }, httpOptions).pipe();
  // }
  converse(message: string) : Promise<any>{ 
    var msgObject = { userid:'1', message: message };

    return fetch(
      'http://127.0.0.1:5000/chat/conversation', // the url you are trying to access
      {
        method: 'POST', // GET, POST, PUT, DELETE
        credentials: 'include',
        body: JSON.stringify(msgObject),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      },
    ).then(value => value.json());
  }

  // authorize() : Observable<any>{
  //    return this.http.get('http://127.0.0.1:5000/chat/authorize');
  // }
 
  authorize(): Promise<any> {
      return fetch(
        'http://127.0.0.1:5000/chat/authorize', // the url you are trying to access
        {
          method: 'GET', // GET, POST, PUT, DELETE
          credentials: 'include'
        }
      ).then(value => value.json());
  }
  sendActiveScriptId(scriptID: String) : Promise<any>{
    var body = { userid:'1', script_id: scriptID };

    return fetch(
      'http://127.0.0.1:5000/chat/setActiveScriptId', // the url you are trying to access
      {
        method: 'POST', // GET, POST, PUT, DELETE
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      },
    ).then(value => value.json());
  }

  // isSignedIn(): Observable<any>{
  //   return this.http.get('http://127.0.0.1:5000/chat/signed-in').pipe();
  // } 

  isSignedIn(): Promise<any>{
      return fetch(
        'http://127.0.0.1:5000/chat/signed-in', // the url you are trying to access
        {
          method: 'GET',
          credentials: 'include'
        }
      ).then(value => value.json());
    }

    // TODO CLEANUP THIS, create common fetch method
}