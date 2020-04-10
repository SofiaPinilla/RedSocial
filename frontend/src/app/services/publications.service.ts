import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
 public publications;
 public publication ='';

  constructor(public httpClient:HttpClient) { }

post(publication: object): Observable<any> {
    return this.httpClient.post('http://localhost:3000/publications', publication);
}
post2(publication2): Observable<any> {
  return this.httpClient.post('http://localhost:3000/publications/notimage', publication2);
}

getAll(): Observable<any> {
  return this.httpClient.get('http://localhost:3000/publications');
}

deleteOne(id:string): Observable<any> {
  return this.httpClient.delete(`http://localhost:3000/publications/${id}`);
}


}