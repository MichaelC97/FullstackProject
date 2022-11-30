import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navcomponent',
  templateUrl: './navcomponent.component.html',
  styleUrls: ['./navcomponent.component.css']
})
export class NavcomponentComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
