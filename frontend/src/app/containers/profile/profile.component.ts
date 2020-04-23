import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PublicationsService } from 'src/app/services/publications.service';
import { HttpResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  API_URL: string = environment.API_URL;
  avatar:File;
  constructor(public userService: UserService, public publicationsService: PublicationsService, private notificationService: NzNotificationService,private nzMessageService: NzMessageService) { }

  ngOnInit(): void {
    const token: string = localStorage.getItem('authToken')
    this.userService.getInfo(token)
      .subscribe((res => {
        this.userService.user = res
    }))
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
  cancel(): void {
    this.nzMessageService.info('Canceled');
  }
  
  confirm(): void {
    this.nzMessageService.info('click confirm');
  }
  showUpdatePublicationModal(publication) {
    this.publicationsService.isModalVisible = true;
    this.publicationsService.setPublication(publication);
  }

  editProf() {
    this.isVisible = false;
    const profileFormData = new FormData();
    for (const key in this.userService.user) {
      profileFormData.set(key, this.userService.user[key]);
    }
    if (this.avatar) profileFormData.set('avatar', this.avatar);
    this.isVisible = false;
    this.userService.editProfile(profileFormData)
      .subscribe((res: HttpResponse<object>)=> {
        this.avatar = null;
        this.userService.setUser(res['user']);

        const token:string=localStorage.getItem('authToken')
        this.userService.getInfo(token)
        .subscribe(res => {
          this.userService.user = res
     
      })
  } )}

 editHead (headerInput) {
  this.isVisible = false;
  const headerFormData = new FormData();
  if (headerInput.files[0]) headerFormData.set('headerImage', headerInput.files[0]);
  this.userService.editHeader(headerFormData)
  .subscribe((res: HttpResponse<object>)=> {
    headerInput.value = '';
    this.userService.setUser(res['user']);

    const token:string=localStorage.getItem('authToken')
    this.userService.getInfo(token)
    .subscribe(res => {
      this.userService.user = res
 
  })
} )

 }

  showModal(): void {
    this.isVisible = true;
  }


  handleCancel(): void {

    this.isVisible = false;
  }


  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  GiveLike(publication){
    
    this.publicationsService.likes(publication)
    .subscribe (
      res => {
        this.publicationsService.publication = res
        const token: string = localStorage.getItem('authToken')
        this.userService.getInfo(token)
          .subscribe((res => {
            this.userService.user = res
        }))
      },
      error => console.error(error)
    )
  
}



NoLike(publication) {  
  this.publicationsService.dislikes(publication)
  .subscribe (
    res => {
      this.publicationsService.publication = res
      const token: string = localStorage.getItem('authToken')
      this.userService.getInfo(token)
        .subscribe((res => {
          this.userService.user = res
      }));
    },
    error => console.error(error)
  )

}

}
