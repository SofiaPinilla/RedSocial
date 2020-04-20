import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  
  constructor(public httpClient :HttpClient) { }
  public message
  public messages
  public sendMessages
  public token: any = "";
  // get(token: string): Observable<any> {//Los que envias
  //   return this.httpClient.get('http://localhost:3000/messages/get',{
  //     headers: {
  //       authorization: token
  //     }
  //   })
  // }
  getRecibe(recipient_name: string,token: string): Observable<any> {//Los que recibes
    return this.httpClient.get(`http://localhost:3000/messages/get/${recipient_name}`,{
      headers: {
        authorization: token
      }
    });
  }
  postMessage(recipient_name: any, message:FormData,  token: any): Observable<any> {
    return this.httpClient.post(`http://localhost:3000/messages/${recipient_name}`,message ,{
      headers: {
        authorization: token
      }
    });
  }

  setMessage(message) {
    this.message = message;
  }

}
