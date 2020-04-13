import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User = {
    name: ''
  };
  constructor(public httpClient: HttpClient) { }
  public token: string = "";
  login(user: object): Observable<any> {
    return this.httpClient.post('http://localhost:3000/users/login', user);
  }
  setUser(user: User) {
    this.user = user
  }
  getInfo(token: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/users/info',{
      headers: {
        authorization: token
      }
    });
  }

  signup(user:object):Observable<any>{
    return this.httpClient.post('http://localhost:3000/users/register',user);
  }

  logout(token: string){
    return this.httpClient.get('http://localhost:3000/users/logout',{
      headers: {
        authorization: token
      }
    });
  }

  editProfile(user: FormData): Observable<any> {
    return this.httpClient.put('http://localhost:3000/users', user, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }
    });
    
  }
 

  editHeader(user: FormData): Observable<any> {
    return this.httpClient.put(`http://localhost:3000/users/header`, user, {
      headers: {
        Authorization: localStorage.getItem('authToken') || ''
      }
    });
  }

  setToken(token: string): void {
    this.token = token;
  }
  getToken(): string {
    return this.token;
  }
  // post(user: FormData): Observable<any> {
  //   return this.httpClient.post('http://localhost:3000/users', user, {
  //     headers: {
  //       Authorization: localStorage.getItem('authToken') || ''
  //     }
  //   });
  // }
}