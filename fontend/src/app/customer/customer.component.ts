import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
  movies = [{id: ''},{loai:''}];
  selectedMovie;
  constructor(private api: CustomerService) {
    this.getMovies();
    this.selectedMovie = {id: -1, loai: ''};
  }

  ngOnInit(): void {
  }
  getMovies = () => {
    this.api.getAllMovies().subscribe(
      data => {
        this.movies = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  movieClicked = (movie) => {
    this.api.getOneMovie(movie.id).subscribe(
      data => {
        this.selectedMovie = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  movieBack = (movie) => {
    this.api.getAllMovies().subscribe(
      data => {
        this.selectedMovie =-1;
      },
      error => {
        console.log(error);
      }
    );
  }

   movieallBack = () => {
    this.api.getAllMovies().subscribe(
      data => {
        this.selectedMovie = {id: -1, loai: ''};
      },
      error => {
        console.log(error);
      }
    );
  }

  updateMovie = () => {
    this.api.updateMovie(this.selectedMovie).subscribe(
      data => {
        this.getMovies();
      },
      error => {
        console.log(error);
      }
    );
  }
  createMovie = () => {
    this.api.createMovie(this.selectedMovie).subscribe(
      data => {
        this.movies.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteMovie = () => {
    this.api.deleteMovie(this.selectedMovie.id).subscribe(
      data => {
        this.getMovies();
      },
      error => {
        console.log(error);
      }
    );
  }

}
