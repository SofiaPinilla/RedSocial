import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { NgForm } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  theme = true;
  isVisible = false;
  inputValue: any;
  public publications;

  constructor(public publicationsService: PublicationsService, public router: Router, public userService: UserService) { }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  postPublic(imageInput) {
    const publicationFormData = new FormData();
    publicationFormData.set('publication', this.inputValue);
    if (imageInput.files[0]) publicationFormData.set('image', imageInput.files[0]);
    this.isVisible = false;
    this.publicationsService.post(publicationFormData)
      .subscribe((res: HttpResponse<object>) => {
        this.publicationsService.getAll()
          .subscribe(res => {
            this.publicationsService.publications = res
          },
            err => console.error(err));
      })
  }

}