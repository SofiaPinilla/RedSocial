import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  public comments;
  
  comment = { };
  

  constructor(public httpClient: HttpClient) { }
  
  post(comment: FormData, id:any): Observable<any> {

    return this.httpClient.post(environment.API_URL +`/comments/${id}`, comment, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }


    });
  }

  deleteOne(id: string): Observable<any> {
    return this.httpClient.delete(environment.API_URL +`/comments/${id}`, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }
    });
  }
  
  setComment(comment:object) {
    this.comment = comment;
  }
}



