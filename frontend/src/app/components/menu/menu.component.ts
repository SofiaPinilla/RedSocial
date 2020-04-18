import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { NgForm } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { NzIconService } from 'ng-zorro-antd/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {
  inputSearch;
  publications2
  constructor(private iconService: NzIconService,public publicationsService:PublicationsService, public userService: UserService, public router: Router, public route: ActivatedRoute, public location: Location) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
    });
  }

  search(users)  {
    const search = this.route.snapshot.params.search;
    this.userService.searchUser(search)
      .subscribe(res => {
                       this.userService.users = res
                  
                      })  
  }
  showModal(): void {
    this.publicationsService.isModalVisible = true;
  }

  logout(){
    localStorage.removeItem('authToken') 
    this.userService.setUser({});
    this.router.navigate([''])
  }

}
