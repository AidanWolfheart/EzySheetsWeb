import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { GoogleAuth } from '../models/googleAuth.model';
import { ChatResponse } from '../models/chatResponse.model';

@Injectable({
    providedIn: 'root'
  })
export class ChatService {
  constructor(private http: HttpClient) { }

   send(googleAuth: GoogleAuth) : Observable<GoogleAuth>{
        return this.http.post<GoogleAuth>('http://127.0.0.1:5000/chat/send-auth', googleAuth).pipe();
   }
}