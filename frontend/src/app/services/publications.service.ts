import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
 public publications;

  constructor(public httpClient:HttpClient) { }

  post(publication: object): Observable<any> {
    return this.httpClient.post('http://localhost:3000/publications', publication);
}

getAll(): Observable<any> {
  return this.httpClient.get('http://localhost:3000/publications');
}
}




