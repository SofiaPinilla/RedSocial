import { Component, OnInit } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {
  constructor(public publicationsService: PublicationsService, ) { }

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
      this.publicationsService.publication = publication;
      this.publicationsService.getAll()
      .subscribe (res => {
        console.log(res)
        this.publicationsService.publications = res},
      );
      
   err=>console.error(err)
  }
    )}
}
