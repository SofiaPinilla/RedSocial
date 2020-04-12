import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PublicationsService } from 'src/app/services/publications.service';
import { HttpResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public userService: UserService, public publicationsService:PublicationsService,private notificationService: NzNotificationService) { }

  ngOnInit(): void {
    const token:string=localStorage.getItem('authToken')
    this.userService.getInfo(token)
    .subscribe( 
      res => console.log(res),
     error=>console.log(error)
    )
  }
  
  theme = true;
  isVisible = false;
  inputValue: any;
  public publications;
  

  deletePublic2(publication) {
    const id = publication._id
    this.publicationsService.deleteOne(id)
      .subscribe(res => {
    this.userService.setUser(res.user)
      }
      )
  }
  showUpdatePublicationModal(publication) {
    this.publicationsService.isModalVisible = true;
    this.publicationsService.setPublication(publication);
  }
  
 
}
