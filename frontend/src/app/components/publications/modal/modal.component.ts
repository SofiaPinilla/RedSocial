import { Component, OnInit } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  public publications;

  constructor(public publicationsService: PublicationsService, public userService: UserService) { }

  handleCancel(): void {
    this.publicationsService.isModalVisible = false;
  }

  postPublic(imageInput) {
    const publicationFormData = new FormData();

    if (this.publicationsService.publication.publication) publicationFormData.set('publication', this.publicationsService.publication.publication);

    if (imageInput.files[0]) publicationFormData.set('image', imageInput.files[0]);
    let httpObservable;

    if (this.publicationsService.publication?._id) {
      publicationFormData.set('_id', this.publicationsService.publication?._id);
      httpObservable = this.publicationsService.editOne(publicationFormData);

    } else {
      httpObservable = this.publicationsService.post(publicationFormData);
    }
    httpObservable.subscribe((res: HttpResponse<object>) => {
      this.publicationsService.isModalVisible = false;
      this.publicationsService.setPublication(this.publicationsService.publication)
      imageInput.value = '';
      this.publicationsService.publication={
        publication: '',
      }
      this.publicationsService.getAll()
      .subscribe(res => {
        this.publicationsService.publications = res
        const token:string=localStorage.getItem('authToken')
        this.userService.getInfo(token)
        .subscribe(res => {
          this.userService.user = res
     
      })
    }
      )
    })
  }

}

