import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-flix-220508.herokuapp.com/';




@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

// Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
 constructor(private http: HttpClient) {
}

 /**
   * POST API call to register the user
   * @param userDetails
   * @returns user data in JSON
   * @function userRegistration
   */

public userRegistration(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'users', userDetails).pipe(
  catchError(this.handleError)
  );
}

  /**
   * Handle error
   * @param error
   * @returns
   * @function handleError
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

  /**
   * POST API call to log in the user
   * @param {any} userDetails
   * @returns user data in JSON
   * @function userLogin
   */
  
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError));
  }

 /**
   * GET API call to get all movies
   * @returns array of all movies in JSON
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

   /**
   * GET API call to get data of a single movie
   * @param {string} title
   * @returns movie data in JSON
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

   /**
   * GET API call to get data of a director
   * @param {string} director
   * @returns data of director in JSON
   * @functiongetDirector
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

   /**
   * GET API call to get data of a genre
   * @param {string} genre
   * @returns data of genre in JSON
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

  /**
   * display favorite movies list of a user
   * @function getFavoriteMovies
   * @returns displays all favorite movies of user
   */

  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
 /**
   * PUT API call to add movie to favorite movies of a user
   * @param {string} movie
   * @returns user data in JSON
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
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

 /**
   * DELETE API call to remove movie from favorite movies of a user
   * @param {string} movie
   * @returns user data in JSON
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

 /**
   * PUT API call to update user data
   * @param {any} userData
   * @returns user data in JSON
   * @function updateUser
   */

  public  updateUser(updateDetails:any): Observable<any> {
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

     /**
   * DELETE API call to delete user
   * @returns message as confirmation
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

     /**
   * GET API call to get user data
   * @returns user data in JSON
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

