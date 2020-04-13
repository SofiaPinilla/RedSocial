import { Component, OnInit } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse } from '@angular/common/http';
import * as moment from "moment";
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
    this.getAllPublications();
    setInterval(this.getAllPublications,30000);
  }

  getAllPublications=()=>{
    this.publicationsService.getAll()
    .subscribe(
      res => {
        this.publicationsService.publications = res.map(this.getHaceCuanto);
        console.log(this.userService.user)
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

}
