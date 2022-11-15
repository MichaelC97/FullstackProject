import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})

export class MonsterComponent implements OnInit {

  constructor(private webService: WebService) {}


  async ngOnInit() {
    var response = await this.webService.getMonster();
    console.log(response);
    }

  monster_list : any;


}
