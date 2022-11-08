import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};
  FavoriteMovies: any[] = [];
  

  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
  this.getMovies();
  this.getUser();

  
 
}

 /**
   * Get data of all movies using API and store locally
   * @return {array} data of all movies
   * @function getMovies
   */

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

    /**
   * Gets user data from api call and sets the user variable to returned JSON file
   * @returns object holding user information
   * @function getUser
   */
   
   getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.FavoriteMovies = this.user.FavoriteMovies; console.log(this.user);
      return this.user;
    });
  }

 /**
   * @service Opens dialog of GenreComponent
   * @param {string} name
   * @param {string} description
   * @function openMovieGenreDialog
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
   * @service Opens dialog of DirectorComponent
   * @param {string} name
   * @param {string} bio
   * @param {Date} birthday
   * @function openMovieDirectorDialog
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
   * @service Opens dialog of SynopsisComponent
   * @param {string} title
   * @param {string} description
   * @function openMovieSynopsisDialog
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

  /**
   * @service Add or remove a movie to the user favorite list of movies
   * @param {string} id  
   * @returns list of favorite movies
   * @function onToggleFavoriteMovie
   */

onToggleFavoriteMovie(id: string): any {
  if (this.isFav(id)) {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Removed from favorites!', 'OK', {
        duration: 2000,
      });
    });
    const index = this.FavoriteMovies.indexOf(id);
    return this.FavoriteMovies.splice(index, 1);
  } else {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Added to favorites!', 'OK', {
        duration: 2000,
      });
    });
  }
  return this.FavoriteMovies.push(id);
}

 /**
   * @service specify a movie by their id as a user favorite movie 
   * @param {string} id 
   * @returns favorite movies with the id of each movie
   * @function isFav
   */

isFav(id: string): boolean {
  return this.FavoriteMovies.includes(id)
}

}