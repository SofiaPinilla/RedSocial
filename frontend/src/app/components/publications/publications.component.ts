import { Component, OnInit } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
  theme = true;
  isVisible = false;
  inputValue: any;
  public publications;
  constructor(public publicationsService: PublicationsService, public userService: UserService) { }
  ngOnInit(): void {

    this.publicationsService.getAll()
      .subscribe(
        res => {
          this.publicationsService.publications = res;
        },
        error => console.error(error)
      );
  }

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
  updatePublic(imageInput, publication) {
    const id = publication._id

    const publicationFormData = new FormData();
    publicationFormData.set('publication', this.inputValue);

    if (imageInput.files[0]) publicationFormData.set('image', imageInput.files[0]);
    this.isVisible = false;
    this.publicationsService.editOne(id)
      .subscribe((res: HttpResponse<object>) => {
        imageInput.value = '';
        this.inputValue = '';
        this.publicationsService.getAll()
          .subscribe(res => {
            this.publicationsService.publications = res
          },
            err => console.error(err));
      })
  }
  // updatePublic2(publication) {
  //   const id = publication._id
  //   this.publicationsService.editOne(id)
  //   .subscribe(publication => {
  //     this.publicationsService.getAll()
  //     .subscribe (res => {
  //       console.log(res)
  //       this.publicationsService.publications = res
  //     },
  //     );

  //  err=>console.error(err)
  // }
  //   )}
}
