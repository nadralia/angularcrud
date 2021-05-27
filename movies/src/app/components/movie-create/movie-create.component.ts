import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {

  movie = {
    budget: '',
    genres: [],
    homepage: '',
  };
  submitted = false;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  createMovie(): void {
    const data = {
      budget: this.movie.budget,
      genres: [{ id: "12", "name": this.movie.genres}],
      homepage: this.movie.homepage,
    };

    this.movieService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newMovie(): void {
    this.submitted = false;
    this.movie = {
      budget: '',
      genres: [],
      homepage: '',
    };
  }

}
