import { Component, OnInit, HostListener } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Directive, ElementRef } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
inputMessage
messageBody
imageInput



  constructor( public messageService : MessagesService,public router: Router, public route: ActivatedRoute, public location: Location, public userService: UserService, private _el: ElementRef) { }

 


  ngOnInit(): void {
    // this.getAllPublications();
    //
    this.getMessages();
    setInterval(this.getMessages,50000);
    
    
  // setInterval(this.messageService.getRecibe,5000);

  }

 
  public scrollToBottom() {
    const el: HTMLDivElement = this._el.nativeElement;
    el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight);
  }


getMessages =() =>{
  const token: any = localStorage.getItem('authToken')
  const recipient_name =  this.route.snapshot.params.name;
  this.messageService.getRecibe(recipient_name,token)
  .subscribe((res =>{
    this.messageService.messages=res
  }))
}
  // @HostListener("scroll", ['$event'])
  // doSomethingOnInternalScroll($event:Event){
  //   let scrollOffset = $event.srcElement.scrollTop;
  //   console.log("scroll: ", scrollOffset);
  // }

  sendMessage(imageInput){
    const token: any = localStorage.getItem('authToken')
    const recipient_name =  this.route.snapshot.params.name;
    const messageFormData = new FormData();
    if (this.inputMessage) messageFormData.set("messageBody", this.inputMessage);
     if (imageInput.files[0]) messageFormData.set('imageMessage', imageInput.files[0]);
     this.messageService.postMessage( recipient_name, messageFormData , token)
       .subscribe((res: HttpResponse<any>)  => {
         imageInput.value = '';
         this.inputMessage = '';
         this.messageService.setMessage(this.messageService.message)
         imageInput.value = '';
         this.messageService.message={
          message : ''
              }

         const token: any = localStorage.getItem('authToken')
    const recipient_name =  this.route.snapshot.params.name;
    this.messageService.getRecibe(recipient_name,token)
    .subscribe((message =>{
      this.messageService.messages=message
    }))
    err => console.error(err); 
         })
  }
  
  
}
