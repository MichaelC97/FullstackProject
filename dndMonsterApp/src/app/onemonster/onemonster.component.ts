import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-onemonster',
  templateUrl: './onemonster.component.html',
  styleUrls: ['./onemonster.component.css']
})

export class OnemonsterComponent implements OnInit {

  monster_Name : any;
  findMonsterByName : any;

  constructor(public webService: WebService, private router: Router, public http: HttpClient, private route : ActivatedRoute) {}

  
  ngOnInit() {

    this.monster_Name = this.route.snapshot.paramMap.get('my_object');
    var monsterFound = String(this.monster_Name)
    console.log("monster name as String: " + monsterFound)
    var monsterwoutQuotes = monsterFound.replace(/['"]+/g, '' )
    console.log("monster name as String2: " + monsterwoutQuotes)
    console.log("monster name: " + this.monster_Name)
    this.webService.getOneMonster(monsterwoutQuotes)

    };

}




