import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {





  movies: any;
  currentMovie = null;
  currentIndex = -1;
  id = '';

  tableSettings: any = {
    viewportColumnRenderingOffset: 27,
    viewportRowRenderingOffset: "auto",
    height: 450,
    width: 924,
    maxRows: 22,
    manualRowResize: true,
    manualColumnResize: true,
     columns: [
        {
          data: 'id',
          type: 'numeric',
          width: 40
        },
        {
          data: 'budget',
          type: 'text'
        },
        
        {
          data: 'genres',
          type: 'text'
        },
        {
          data: 'homepage',
          type: 'text'
        },
      ],
    colHeaders: ["ID", "Budget", "Genres", "homepages"],
    manualRowMove: true,
    manualColumnMove: true,
    contextMenu: true,
    filters: true,
    dropdownMenu: true,
    afterValidate: function(isValid: any, value: boolean, row: any, prop: any){
      if(value == false){
        	console.log( value, row, prop)    
          alert("Invalid")
      }
			
    }
  };

  
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.readMovies();
  }

  readMovies(): void {
    this.movieService.readAll()
      .subscribe(
        movies => {
          this.movies = movies;
          console.log(movies);
        },
        error => {
          console.log(error);
        });
  }

  refresh(): void {
    this.readMovies();
    this.currentMovie = null;
    this.currentIndex = -1;
  }

  setCurrentMovie(movie: any, index: number): void {
    this.currentMovie = movie;
    this.currentIndex = index;
  }

  deleteAllMovies(): void {
    this.movieService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.readMovies();
        },
        error => {
          console.log(error);
        });
  }

  readById(): void {
    this.movieService.read(this.id)
      .subscribe(
        movies => {
          this.movies = movies;
          console.log(movies);
        },
        error => {
          console.log(error);
        });
  }

}
