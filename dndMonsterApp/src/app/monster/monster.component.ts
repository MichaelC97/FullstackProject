import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { OnemonsterComponent } from '../onemonster/onemonster.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})

export class MonsterComponent implements OnInit {
  monster_list : any;

  constructor(public webService: WebService, private router: Router, public http: HttpClient) {}


  btnGetOneMonster(name: string){
    console.log("btnGetOneMonster()")
    var urlString = "monsters/" + name
    console.log(urlString)
    console.log(name)
    
    this.router.navigate([urlString, {my_object: JSON.stringify(name)}]);
    
    console.log("Finished btn")
  }
  
  ngOnInit() {

      this.webService.getMonster();

    }



}
