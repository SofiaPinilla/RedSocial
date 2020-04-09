import { Component, OnInit } from '@angular/core';
import { PublicationsService } from 'src/app/services/publications.service';
import { NgForm } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  theme = true;
  isVisible = false;
  inputValue: string;
  public publications;
  
  constructor(public publicationsService: PublicationsService, public router: Router) { } 

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
 

  ngOnInit(): void {
    
  }
  
  postPublic(publicForm:NgForm) {
    const publication = {
      publication: this.inputValue
    }
    this.isVisible = false;
    this.publicationsService.post(publication)
    .subscribe ((res: HttpResponse<object>) => {
      this.publicationsService.getAll()
              .subscribe (res => {
                console.log(res)
                this.publicationsService.publications = res},
                err => console.error(err));

          },)
      
}

}