import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

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
    this.getMovies();
   
  
  }

   /**
   * Gets user data from api call and sets the user variable to returned JSON file
   * @returns object holding user information
   * @function getUser
   */
   
     getUser(): void {
      this.fetchApiData.getUser().subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        return this.user;
      });
    }

   

  
    getMovies(): void {
      this.fetchApiData.getAllMovies().subscribe(
        (resp: any) => {
          this.movies = resp;
          this.fetchApiData.getUser().subscribe((resp: any) => {
            this.user = resp;
            this.FavoriteMovies = this.user.FavoriteMovies.map((_id: string) => {
              return this.movies.find((movie: any) => {
                return movie._id === _id;
              });
            });
          });
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  
     /**
   * Remove movie from user"s favorite movies using API
   * @function removeFromFavoriteMovies
   */

    removeFavoriteMovie(id: string): void {
      this.fetchApiData.removeFavoriteMovie(id).subscribe((resp: any) => {
        const index = this.FavoriteMovies.map((m) => m._id).indexOf(id);
        this.FavoriteMovies.splice(index, 1);
      });
    }

    
  
/**
   * @function deleteProfile
   * opens dialog to delete user and clear the stored user information
   */

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

   /**
   * @function openEditProfileDialog
   * opens dialog to allow user to edit information
   */

  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '300px',
    });
  }

  /**
   * Opens dialog of GenreComponent
   * @param {string} name
   * @param {string} description
   * @function openGenreDialog
   */

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

/**
   * Opens dialog of DirectorComponent
   * @param {string} name
   * @param {string} bio
   * @param {string} birthday
   * @function openDirectorDialog
   */
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

/**
   * Opens dialog of SynopsisComponent
   * @param {string} title
   * @param {string} description
   * @function openSynopsisDialog
   */

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
}



