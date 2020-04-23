import { Component, OnInit } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent implements OnInit {
  API_URL: string = environment.API_URL;

  constructor( public publicationsService: PublicationsService, public commentsService:CommentsService, public userService: UserService, public router: Router, public route: ActivatedRoute, public location: Location) { }

  ngOnInit(): void {
    const name = this.route.snapshot.params.email;
    this.userService.searchUserName(name)
             .subscribe(res => {
               this.userService.users = res
               
              })  
  }
 
  

  GiveLike(publication){
    
    this.publicationsService.likes(publication)
    .subscribe (
      res => {
        this.publicationsService.publication = res
        const name = this.route.snapshot.params.email;
        this.userService.searchUserName(name)
        .subscribe(res => {
          this.userService.users = res
          
         })  
      },
      error => console.error(error)
    )
  
}

NoLike(publication) {  
  this.publicationsService.dislikes(publication)
  .subscribe (
    res => {
      this.publicationsService.publication = res
      const name = this.route.snapshot.params.email;
      this.userService.searchUserName(name)
             .subscribe(res => {
               this.userService.users = res
               
              })  
    },
    error => console.error(error)
  )

}

follow(user){
  this.userService.follow(user)
  .subscribe (
    res => {
      this.userService.user = res
      const name = this.route.snapshot.params.email;
      this.userService.searchUserName(name)
             .subscribe(res => {
               this.userService.users = res
               
              })  
    },
    error => console.error(error)
  )

}

unfollow(user) {  
this.userService.unfollow(user)
.subscribe (
  res => {
    this.userService.user = res
    const name = this.route.snapshot.params.email;
    this.userService.searchUserName(name)
           .subscribe(res => {
             this.userService.users = res
            
            })  
  },
  error => console.error(error)
)

}
}
