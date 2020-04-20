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

public publications2;
  constructor(public publicationsService: PublicationsService, public router: Router, public route: ActivatedRoute, public location: Location, public userService: UserService) { }

  ngOnInit(): void {
  const search = this.route.snapshot.params.search;
  this.publicationsService.searchPubli(search)
           .subscribe(res => {
             this.publicationsService.publications2 = res
        
            })  

const search2 = this.route.snapshot.params.search;
this.userService.searchUser(search2)
      .subscribe(res => {
                       this.userService.users = res
                  
                      })  
}






GiveLike(publication){
    
  this.publicationsService.likes(publication)
  .subscribe (
    res => {
      this.publicationsService.publication = res
      const search = this.route.snapshot.params.search;
      this.publicationsService.searchPubli(search)
               .subscribe(res => {
                 this.publicationsService.publications2 = res}) 
    },
    error => console.error(error)
  )

}

NoLike(publication) {  
this.publicationsService.dislikes(publication)
.subscribe (
  res => {
    this.publicationsService.publication = res
    const search = this.route.snapshot.params.search;
  this.publicationsService.searchPubli(search)
           .subscribe(res => {
             this.publicationsService.publications2 = res}) 
  },
  error => console.error(error)
)

}
}
// ngDoCheck(): void {
//   console.log('holi')
//   const search = this.route.snapshot.params.search;
//   this.publicationsService.searchPubli(search)
//            .subscribe(res => {
//             console.log(res)
//              this.publicationsService.publications2 = res})  
// }



  


