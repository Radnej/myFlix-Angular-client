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
  favoriteMovies: any[] = [];
  

  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
  this.getMovies();
  this.getUser();

  
 
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
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

onToggleFavoriteMovie(id: string): any {
  if (this.isFav(id)) {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Removed from favorites!', 'OK', {
        duration: 2000,
      });
    });
    const index = this.favoriteMovies.indexOf(id);
    return this.favoriteMovies.splice(index, 1);
  } else {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Added to favorites!', 'OK', {
        duration: 2000,
      });
    });
  }
  return this.favoriteMovies.push(id);
}



isFav(id: string): boolean {
  return this.favoriteMovies.includes(id)
}

}