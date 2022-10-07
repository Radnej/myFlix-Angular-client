import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any = '';
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
  }

   //navigate to user profile
   loadProfile(): void {
    this.router.navigate(['profile']);
  }

  //navigate to movie-card page
  loadMovies(): void {
    this.router.navigate(['movies']);
  }

  //logout the user from app
  logoutUser(): void {
    localStorage.clear();
    alert('You have successfully logged out');
    this.router.navigate(['welcome']);
  }
}
