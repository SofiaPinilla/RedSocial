import { Component, OnInit } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-directs',
  templateUrl: './directs.component.html',
  styleUrls: ['./directs.component.scss']
})
export class DirectsComponent implements OnInit {
  inputSearch;
  constructor(public publicationsService: PublicationsService, public router: Router, public route: ActivatedRoute, public location: Location) { }
  

  ngOnInit(): void {
  }


}