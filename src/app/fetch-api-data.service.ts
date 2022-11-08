import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-flix-220508.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  //API call to register a new user
  /**
   * @service POST to an API endpoint to register a new user
   * @param {any} userDetails
   * @returns a new user object in json format
   * @function userRegistration
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * handles errors
   * @param error
   * @returns error message
   */

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error(`Some error occurred: ${error.error.message}`);
    } else {
      console.error(
        `Error Status code ${error.status}, Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  //API call to login a user
  /**
   * @service POST to an API endpoint to login a user
   * @param {any} userDetails
   * @returns a user object in json format
   * @function userLogin
   */

  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  //API Endpoint for getting All Movies
  /**
   * @service GET to an API endpoint to get all movies
   * @returns an array of all movies in json format
   * @function getAllMovies
   */

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //API Endpoint for getting Movie by Title
  /**
   * @service GET to an API endpoint to get a movie by title
   * @param {string} title
   * @returns an single object of a single movie in json format
   * @function getOneMovie
   */

  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //API Endpoint for getting director info
  /**
   * @service GET to an API endpoint to get director info
   * @param {string} director
   * @returns data of director in JSON format
   * @function getDirector
   */

  public getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}directors/${director}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //API Endpoint for getting genre info
  /**
   * @service GET to an API endpoint to get genre info
   * @param {string} genre
   * @returns data of genre in JSON format
   * @function getGenre
   */

  public getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}genres/${genre}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //API Endpoint to add favorite movie to user's list
  /**
   * @service POST to an API endpoint to add movie to user's favorite movies list
   * @param {string} movieID
   * @returns the update user object in JSON format
   * @function addFavoriteMovie
   */

  public addFavoriteMovie(movieID: string): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('user');
    console.log(apiUrl + `users/${username}/movies/${movieID}`);
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieID}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //API Endpoint to remove favorite movie from user's list
  /**
   * @service DELETE to an API endpoint to remove a movie from a user's favorites list
   * @param {any} movieID
   * @returns the update user object in JSON format
   * @function removeFavoriteMovie
   */

  public removeFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${user}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //API Endpoint to update user Details
  /**
   * @service PUT to an API endpoint to update a user's details
   * @param {any} updateDetails
   * @returns the update user object in JSON format
   * @function updateUser
   */

  public updateUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(`${apiUrl}users/${user}`, updateDetails, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //API Endpoint to delete a user
  /**
   * @service DELETE to an API endpoint to delete a user
   * @returns a success meassage
   * @function deleteUser
   */

  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //API Endpoint to get specific user Info
  /**
   * @service GET to an API endpoint to get a specific user
   * @returns a user object in JSON format
   * @function getUser
   */

  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
