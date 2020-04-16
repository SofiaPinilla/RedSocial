import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  public comments;
  
  comment = { };
  

  constructor(public httpClient: HttpClient) { }
  
  post(comment: FormData, id:any): Observable<any> {

    return this.httpClient.post(`http://localhost:3000/comments/${id}`, comment, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }


    });
  }

  deleteOne(id: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/comments/${id}`, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }
    });
  }
  
  setComment(comment:object) {
    this.comment = comment;
  }
}



