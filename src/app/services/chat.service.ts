import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, from, Observable, throwError } from 'rxjs';
import { GoogleAuth } from '../models/googleAuth.model';
import { ChatResponse } from '../models/chatResponse.model';
import { AppSettings } from '../shared/appsettings';

@Injectable({
    providedIn: 'root'
  })
export class ChatService {
  constructor(private http: HttpClient) { }

  serviceName = 'chat'

  send(googleAuth: GoogleAuth) : Observable<GoogleAuth>{
    return this.http.post<GoogleAuth>(AppSettings.getEndpointWithService(this.serviceName)+'send-auth', googleAuth).pipe();
  }

  converse(message: string) : Promise<any>{ 
    var msgObject = { userid:'1', message: message };   
    return fetch(
      AppSettings.getEndpointWithService(this.serviceName)+'conversation', // the url you are trying to access
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

  authorize(): Promise<any> {
      return fetch(
        AppSettings.getEndpointWithService(this.serviceName)+'authorize', // the url you are trying to access
        {
          method: 'GET', // GET, POST, PUT, DELETE
          credentials: 'include'
        }
      ).then(value => value.json());
  }
  sendActiveScriptId(scriptID: String) : Promise<any>{
    var body = { userid:'1', script_id: scriptID };

    return fetch(
      AppSettings.getEndpointWithService(this.serviceName)+'set-active-script-id', // the url you are trying to access
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

  getActiveScriptId() : Promise<any> {
    return fetch(
      AppSettings.getEndpointWithService(this.serviceName)+'get-active-script-id', // the url you are trying to access
      {
        method: 'GET', // GET, POST, PUT, DELETE
        credentials: 'include',
      },
    ).then(value => value.json());
  }

  isSignedIn(): Promise<any>{
      return fetch(
        AppSettings.getEndpointWithService(this.serviceName)+'signed-in', // the url you are trying to access
        {
          method: 'GET',
          credentials: 'include'
        }
      ).then(value => value.json());
    }

    // TODO CLEANUP THIS, create common fetch method
}