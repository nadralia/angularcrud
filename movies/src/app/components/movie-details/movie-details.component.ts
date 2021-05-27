import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  currentMovie = null;
  message = '';

  constructor(private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getMovie(this.route.snapshot.paramMap.get('id'))
  }

  getMovie(id: any): void {
    this.movieService.read(id)
      .subscribe(
        movie => {
          this.currentMovie = movie;
          console.log(movie);
        },
        error => {
          console.log(error);
        });
  }

  updateMovie(): void {
    this.movieService.update(this.route.snapshot.paramMap.get('id'), this.currentMovie)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The movie was updated!';
        },
        error => {
          console.log(error);
        });
  }

  deleteProduct(): void {
    this.movieService.delete(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/movies']);
        },
        error => {
          console.log(error);
        });
  }


}
