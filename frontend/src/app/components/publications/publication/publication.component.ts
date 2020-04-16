import { Component, OnInit } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse } from '@angular/common/http';
import * as moment from "moment";
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommentsService } from 'src/app/services/comments.service';
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {
  inputValue: string | null;
  textValue: string | null;
  theme = true;
  isVisible = false;
  public publications;
    constructor( public publicationsService: PublicationsService, public commentsService:CommentsService, public userService: UserService, public router: Router, public route: ActivatedRoute, public location: Location) { }
  
    ngOnInit(): void {
      const id = this.route.snapshot.params.id;
      // console.log(this.commentsService.prueba)
      this.publicationsService.getPubliId(id)
      .subscribe(publication => {this.publicationsService.publication = publication 
    })
    
}


showModal(): void {
  this.isVisible = true;
}

handleOk(){
  console.log('Button ok clicked!');
  this.isVisible = false;
}

handleCancel(): void {
  console.log('Button cancel clicked!');
  this.isVisible = false;
}

postComment(imageInput) { // comentar
  const id = this.route.snapshot.params.id;
  const commentFormData = new FormData();
  if (this.textValue) commentFormData.set('comment', this.textValue);
  if (imageInput.files[0]) commentFormData.set('image', imageInput.files[0]);
  this.isVisible = false;
  this.commentsService.post(commentFormData, id)
  .subscribe((res: HttpResponse<any>) => {
      imageInput.value = '';
      this.textValue = '';
      this.commentsService.setComment(this.commentsService.comment)
      this.publicationsService.setPublication(this.publicationsService.publication)
      imageInput.value = '';
      this.commentsService.comment={
  comment : ''
      }
      const id = this.route.snapshot.params.id;
      this.publicationsService.getPubliId(id)
      .subscribe(publication => {this.publicationsService.publication = publication
    })
    
   err => console.error(err); 
      })

}

}
