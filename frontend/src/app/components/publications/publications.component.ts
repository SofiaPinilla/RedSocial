import { Component, OnInit } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse } from '@angular/common/http';
import * as moment from "moment";
import { CommentsService } from 'src/app/services/comments.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
  API_URL: string = environment.API_URL;
  theme = true;
  isVisible = false;
  inputValue: any;
  // public publications;
  nzTheme= "outline";
  constructor(public publicationsService: PublicationsService, public userService: UserService, public commentsService: CommentsService) { }
  ngOnInit(): void {
    this.getAllPublications();
    setInterval(this.getAllPublications,30000);
  }
  
  getAllPublications=()=>{
    this.publicationsService.getAll()
    .subscribe(
      res => {
        this.publicationsService.publications = res.map(this.getHaceCuanto);
        // this.nzTheme =  this.publicationsService.publications.includes(this.userService.user._id ? 'filled' : 'outline')

      },
      error => console.error(error)
      );
    }
    
    getHaceCuanto = publication => {
      const creationDate = moment(publication.createdAt);
      const diffWeeks = moment().diff(creationDate, 'weeks') ? moment().diff(creationDate, 'weeks') + ' weeks ago':'';
      const diffDays = moment().diff(creationDate, 'days') ? moment().diff(creationDate, 'days') + ' days ago':'';
      const diffHours = moment().diff(creationDate, 'hours') ? moment().diff(creationDate, 'hours') + ' hours ago':'';
      const diffMinutes = moment().diff(creationDate, 'minutes') ? moment().diff(creationDate, 'minutes') + ' minutes ago':'';
      const diffSeconds = moment().diff(creationDate, 'seconds') ? moment().diff(creationDate, 'seconds') + ' seconds ago':'';
      
      publication['haceCuanto'] = diffWeeks || diffDays || diffHours || diffMinutes || diffSeconds;
    return publication;
  }
  
  // if(this.heartType == 'heart-empty') {
    //   this.postReference.update({
  //     likes: firestore.FieldValue.arrayUnion(this.user.getUID())
  //   })
  // } else {
    //   this.postReference.update({
      //     likes: firestore.FieldValue.arrayRemove(this.user.getUID())
      //   })
      // }
    GiveLike(publication){
    
    this.publicationsService.likes(publication)
    .subscribe (
      res => {
        this.publicationsService.publication = res
        this.publicationsService.getAll()
    .subscribe(
      res => {
        this.publicationsService.publications = res.map(this.getHaceCuanto);
      },
      error => console.error(error)
    );
      },
      error => console.error(error)
    )
  
}

NoLike(publication) {  
  this.publicationsService.dislikes(publication)
  .subscribe (
    res => {
      this.publicationsService.publication = res
      this.publicationsService.getAll()
  .subscribe(
    res => {
      this.publicationsService.publications = res.map(this.getHaceCuanto);
    },
    error => console.error(error)
  );
    },
    error => console.error(error)
  )

}
}
