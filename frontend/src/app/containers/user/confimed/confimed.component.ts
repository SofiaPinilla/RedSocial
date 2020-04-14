import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confimed',
  templateUrl: './confimed.component.html',
  styleUrls: ['./confimed.component.scss']
})
export class ConfimedComponent implements OnInit {

  email: string;
  constructor(private route: ActivatedRoute,private router: Router,public userService: UserService ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.params.token;
    this.userService.getInfo(token)
    .subscribe(
      res => this.userService.setUser(res)
    )
    localStorage.setItem('authToken', token);
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 5000);
  }

}
