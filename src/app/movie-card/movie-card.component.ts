import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
  this.getMovies();
  // this.getFavoriteMovies();
 
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  
  // getFavoriteMovies(): void {
  //   this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
  //     this.favoriteMovies = resp;
  //     console.log(this.favoriteMovies);
  //     return this.favoriteMovies;
  //   });
  // }

 
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id)
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

addFavoriteMovie(id: string): void {
  console.log(id + "Movie id");
  this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
    console.log("Result");
    console.log(result);
    this.ngOnInit();
  })
}


removeFavoriteMovie(id: string): void {
  console.log(id);
  this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
  })
}

}