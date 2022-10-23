import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  FavoriteMovies: any[] = [];
  movies: any[] = [];
  

 
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar,
    
  ) { }

  ngOnInit(): void {
    this.getUser();
    // this.getMovies();
    // this.getFavoriteMovies();
   
  
  }

   //get the user's profile information
   
     getUser(): void {
      this.fetchApiData.getUser().subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        return this.user;
      });
    }

  
    
     
     
    

   


  

      //opens the genre dialog 
openMovieGenreDialog(name: string, description: string): void {
  this.dialog.open(MovieGenreComponent, {
    data: {
      Name: name,
      Description: description,
    },
    // Assign dialog width
    width: '500px'
  });
}

//opens the director dialog 
openMovieDirectorDialog(name: string, bio: string, birthday: Date): void {
  this.dialog.open(MovieDirectorComponent, {
    data: {
      Name: name,
      Bio: bio,
      Birthday: birthday,
    },
    // Assign dialog width
    width: '500px'
  });

}

//opens the synopsis dialog
openMovieSynopsisDialog(title: string, description: string): void {
  this.dialog.open(MovieSynopsisComponent, {
    data: {
      Title: title,
      Description: description,
    },
    // Assign dialog width
    width: '500px'
  });
}


    

  
 
  
//deletes the user profile, redirects to welcome screen
deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This cannnot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 2000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }

  // open the edit profile dialog
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '300px',
    });
  }
  
  
  
  
  

  


}



