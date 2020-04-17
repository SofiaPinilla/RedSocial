import { Component, OnInit } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(public publicationsService: PublicationsService, public router: Router, public route: ActivatedRoute, public location: Location, public userService: UserService) { }

  ngOnInit(): void {
  const search = this.route.snapshot.params.search;
  this.publicationsService.searchPubli(search)
           .subscribe(res => {
            console.log(res)
             this.publicationsService.publications = res})
             console.log(this.publicationsService.publications)
}


  }


