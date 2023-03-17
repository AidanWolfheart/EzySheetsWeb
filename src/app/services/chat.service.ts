import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, from, Observable, throwError } from 'rxjs';
import { GoogleAuth } from '../models/googleAuth.model';
import { ChatResponse } from '../models/chatResponse.model';

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'charset': 'UTF-8',

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

  converse(message: string) : Observable<any>{
    return this.http.post('http://127.0.0.1:5000/chat/conversation', {userid:'1', message: message }, httpOptions).pipe();
  }

  // authorize() : Observable<any>{
  //    return this.http.get('http://127.0.0.1:5000/chat/authorize');
  // }

  authorize(): Promise<any> {
      return fetch(
        'http://127.0.0.1:5000/chat/authorize', // the url you are trying to access
        {
          method: 'GET', // GET, POST, PUT, DELETE
          redirect: 'manual'
        }
      );
  }

  isSignedIn(): Observable<any>{
    return this.http.get('http://127.0.0.1:5000/chat/signed-in', httpOptions).pipe();
  } 
}