import {Component, OnInit} from '@angular/core';
import { UserService} from './heroes/api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent implements OnInit {
  title = 'usermanager-ang';
  constructor() { }

  ngOnInit(): void {
  }

}
