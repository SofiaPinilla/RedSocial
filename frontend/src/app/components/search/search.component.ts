import { Component, OnInit, OnChanges,SimpleChanges, Input } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges {

  @Input() ActivatedRoute
  
public publications2;
  constructor(public publicationsService: PublicationsService, public router: Router, public route: ActivatedRoute, public location: Location, public userService: UserService) { }

  ngOnInit(): void {
  const search = this.route.snapshot.params.search;
  this.publicationsService.searchPubli(search)
           .subscribe(res => {
             this.publicationsService.publications2 = res})  
}



ngOnChanges(changes: SimpleChanges): void {
  console.log('holi')
  const search = this.route.snapshot.params.search;
  this.publicationsService.searchPubli(search)
  .subscribe(res => {
   
    
               this.publicationsService.publications2 = res})  



}

search(publication)  {
  const search = this.route.snapshot.params.search;
  this.publicationsService.searchPubli(search)
  .subscribe(res => {
    this.publicationsService.publications2 = res})  
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



  


