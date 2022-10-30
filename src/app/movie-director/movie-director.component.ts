import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {

    /**
   * Injects data from MovieCard Component to DirectorViewComponent using the MAT_DIALOG_DATA injection token.
   * The data becomes a property on the class and is available to be output in the template.
   * @param data 
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Bio: string,
      Birthday: Date,
    }
  ) { }

  ngOnInit(): void {
  }

}
