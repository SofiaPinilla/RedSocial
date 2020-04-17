import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
  public isModalVisible: boolean = false;
  public publications;
  public publications2;
  public publication: Publication={
    publication:''
  };

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
  getAll2(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/publications');
  }


  getPubliId(id: string): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/publications/${id}`);
  }

  searchPubli(search: string): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/publications/search/${search}`);
  }

  deleteOne(id: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/publications/${id}`, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }
    });
  }

  editOne(publication: FormData): Observable<any> {
    const id =publication.get('_id')
    return this.httpClient.put(`http://localhost:3000/publications/${id}`,publication, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }
    });
  }
  setPublication(publication: Publication) {
    this.publication = publication;
  }

  getPublication(): Publication {
    return this.publication;
  }

}