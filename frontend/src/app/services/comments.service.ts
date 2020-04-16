import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(public httpClient: HttpClient) { }

  post(comment: FormData): Observable<any> {
    return this.httpClient.post('http://localhost:3000/comments/:PublicationId', comment, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }
    });
  }
}
