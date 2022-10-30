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

   /**
   * navigates to user profile
   */

   loadProfile(): void {
    this.router.navigate(['profile']);
  }

   /**
   * navigates to movies (main) page
   */ 

  loadMovies(): void {
    this.router.navigate(['movies']);
  }

   /**
   * logs out users, clears local storage to reset token and user
   */
  
  logoutUser(): void {
    localStorage.clear();
    alert('You have successfully logged out');
    this.router.navigate(['welcome']);
  }
}
