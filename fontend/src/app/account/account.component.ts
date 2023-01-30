import { Component, OnInit } from '@angular/core';
import { Dungsai } from '../dungsai';
import { AccountService } from './account.service';
import {UserService} from '../user.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isDivVisible = true;
  movies = [
    {id: ''},
  {username:''},
  {is_superuser:''},
  {is_staff:''},
  {first_name:''},
  {last_name:''},
  {email:''},
  {phone:''},
  {addresss:''}];
  selectedMovie;
  thongbaos = [{id:''},{noidung: ''}, {trangthai: ''}];
  selectedThongbao;

  dungsai:Dungsai[];
  constructor(private api: AccountService,
    public _user : UserService,
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.selectedMovie = {id: -1, username: '', is_superuser: '', is_staff: '', first_name: '', last_name: '', email: '', phone: '', addresss: ''};
    this.getThongbaos()
    this.selectedThongbao = {id:-1,noidung:'',trangthai:''}

    this.dungsai=[
      {id:1, name:"true"},
      {id:2, name:"false"}
    ];
    if(this._user.username=='admin')
    this.isDivVisible=true;
    else this.isDivVisible=false
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
    console.log(movie.id)
    this.api.getOneMovie(movie.id).subscribe(
      data => {
        this.selectedMovie = data;
      },
      error => {
        console.log(movie.id)
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

// thongbao

getThongbaos = () => {
    this.api.getAllThongbao().subscribe(
      data => {
        this.thongbaos = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  ThongbaoClicked = (tb) => {
    this.api.getOneThongbao(tb.id).subscribe(
      data => {
        this.selectedThongbao = data;
      },
      error => {
        console.log(error);
      }
    );
  }

   TballBack = () => {
    this.api.getAllThongbao().subscribe(
      data => {
        this.selectedThongbao = {id: -1, noidung: '',trangthai:''};
      },
      error => {
        console.log(error);
      }
    );
  }

  updateThongbaos = () => {
    this.api.updateThongbao(this.selectedThongbao).subscribe(
      data => {
        this.getThongbaos();
      },
      error => {
        console.log(error);
      }
    );
  }
  createThongbaos = () => {
    this.api.createThongbao(this.selectedThongbao).subscribe(
      data => {
        this.thongbaos.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteThongbaos = () => {
    this.api.deleteThongbao(this.selectedThongbao.id).subscribe(
      data => {
        this.getThongbaos();
        this.selectedThongbao = {id: -1, noidung: '',trangthai:''};
      },
      error => {
        console.log(error);
      }
    );
  }


}
