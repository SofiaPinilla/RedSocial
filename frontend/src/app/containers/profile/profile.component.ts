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
     error=>console.log(error)
    )
  }

  theme = true;
  isVisible = false;
  inputValue: any;
  public publications;
  

  deletePublic(publication) {
    const id = publication._id
    this.publicationsService.deleteOne(id)
      .subscribe(publication => {
        this.publicationsService.getAll()
          .subscribe(res => {
            console.log(res)
            this.publicationsService.publications = res
          },
          );

        err => console.error(err)
      }
      )
  }
  showUpdatePublicationModal(publication) {
    this.publicationsService.isModalVisible = true;
    this.publicationsService.setPublication(publication);
  }
  postPublic(imageInput) {
    const publicationFormData = new FormData();
    publicationFormData.set('publication', this.inputValue);

    if (imageInput.files[0]) publicationFormData.set('image', imageInput.files[0]);
    this.isVisible = false;
    this.publicationsService.post(publicationFormData)
      .subscribe((res: HttpResponse<object>) => {
        imageInput.value = '';
        this.inputValue = '';
        this.notificationService.success('Publication successfully added','Thanks for your contribution')
        const token:string=localStorage.getItem('authToken')
        this.userService.getInfo(token)
         .subscribe( res => this.userService.setUser(res),

          error=>console.log(error)
    )
      })
  }
}