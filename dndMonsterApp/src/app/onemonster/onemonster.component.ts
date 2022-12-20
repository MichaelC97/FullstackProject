import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-onemonster',
  templateUrl: './onemonster.component.html',
  styleUrls: ['./onemonster.component.css']
})

export class OnemonsterComponent implements OnInit {

monsters_found : any;
actions_found: any = [];
items: any;

  constructor(public webService: WebService, private router: Router, public http: HttpClient, private route : ActivatedRoute, private location : Location, public authService : AuthService) {}

  
  ngOnInit() {
    this.webService.getOneMonster(this.route.snapshot.params['name'])
    this.webService.getMonsterActions(this.route.snapshot.params['name'])
  };

  btnBack() {
    this.location.back();
  }

  btnAdd() {
    
  }
  
}




