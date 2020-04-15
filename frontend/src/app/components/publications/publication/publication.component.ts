import { Component, OnInit } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse } from '@angular/common/http';
import * as moment from "moment";
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {
  theme = true;
  isVisible = false;
  public publications;
    constructor( public publicationsService: PublicationsService, public userService: UserService, public router: Router, public route: ActivatedRoute, public location: Location) { }
  
    ngOnInit(): void {
      const id = this.route.snapshot.params.id;
      this.publicationsService.getPubliId(id)
      .subscribe(publication => {this.publicationsService.publication = publication 
    })
    
}



showUpdatePublicationModal(publication) { 
  this.publicationsService.isModalVisible = true;
  this.publicationsService.setPublication(publication);
  console.log(publication)
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
  const id = this.publicationsService.publication._id
  this.publicationsService.deleteOne(id)
    .subscribe(publication => {
      (publication => {this.publicationsService.publication})
      this.router.navigate(['home']);
      err => console.error(err)
    }
    )
}
}
