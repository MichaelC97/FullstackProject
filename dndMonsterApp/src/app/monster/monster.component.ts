import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';  
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css'],
})
export class MonsterComponent implements OnInit {
searchText: any;
  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
  }
  showFiller = false;
  monster_list: any;
  encounter_list: any;
  page: number = 1;
  
  constructor(
    public webService: WebService,
    private router: Router,
    public http: HttpClient,
    public authService: AuthService
  ) {}

  ngOnInit() {
    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }
    this.webService.getMonster();

  }

  // previousPage() {
  //   if (this.page > 1) {
  //     this.page = this.page - 1;
  //     sessionStorage['page'] = this.page;
  //     this.monster_list = this.webService.getMonster();
  //   }
  // }

  // nextPage() {
  //   this.page = this.page + 1;
  //   sessionStorage['page'] = this.page;
  //   this.monster_list = this.webService.getMonster();
    
  // }
  addToEncounter(userEmail: any, monsterName: any){
      console.log("monster component")
      this.webService.addToEncounter(userEmail, monsterName)
      console.log("get all encounters Start")
      this.webService.getAllEncounters(userEmail);
  }
  showAllEncounters(userEmail : any){
      this.webService.getAllEncounters(userEmail);
  }

  deleteMonster(name : any, userEmail : any){
    this.webService.deleteMonster(name, userEmail);
    this.showAllEncounters(userEmail);
  }
}
