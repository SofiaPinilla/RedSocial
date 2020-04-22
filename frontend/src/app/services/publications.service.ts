import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication.model';
import { environment } from 'src/environments/environment';

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
    return this.httpClient.post(environment.API_URL +'/publications', publication, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }
    });
  }

  getAll(): Observable<any> {
    return this.httpClient.get(environment.API_URL +'/publications');
  }

  getAll2(): Observable<any> {
    return this.httpClient.get(environment.API_URL +'/publications');
  }

  getPubliId(id: string): Observable<any> {
    return this.httpClient.get(environment.API_URL +`/publications/${id}`);
  }

  searchPubli(search: string): Observable<any> {
    return this.httpClient.get(environment.API_URL +`/publications/search/${search}`);
  }

  deleteOne(id: string): Observable<any> {
    return this.httpClient.delete(environment.API_URL +`/publications/${id}`, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }
    });
  }

  editOne(publication: FormData): Observable<any> {
    const id =publication.get('_id')
    return this.httpClient.put(environment.API_URL +`/publications/${id}`,publication, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }
    });
  }

  likes(publication):Observable<any> {
    const id =publication._id
    console.log(id)
    return this.httpClient.put(environment.API_URL +`/publications/likes/${id}`, publication, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }
    });
  }

  dislikes(publication):Observable<any> {
    const id =publication._id
    return this.httpClient.put(environment.API_URL +`/publications/dislikes/${id}`, publication, {
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