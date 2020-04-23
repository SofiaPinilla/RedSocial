import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  API_URL: string = environment.API_URL;

  constructor(public userService: UserService,public router: Router, public route: ActivatedRoute, public location: Location) {  }

  ngOnInit(): void {
    const search = this.route.snapshot.params.search;
  this.userService.searchUser(search)
           .subscribe(res => {
             this.userService.users= res
        
            })  
  }


}
