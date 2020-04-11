import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
  public publications;
  public publication = '';

  constructor(public httpClient: HttpClient) { }

  post(publication: FormData): Observable<any> {
    return this.httpClient.post('http://localhost:3000/publications', publication, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }
    });
  }

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/publications');
  }

  deleteOne(id: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/publications/${id}`, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }
    });
  }


}