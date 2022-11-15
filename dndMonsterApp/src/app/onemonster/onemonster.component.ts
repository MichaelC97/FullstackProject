import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-onemonster',
  templateUrl: './onemonster.component.html',
  styleUrls: ['./onemonster.component.css'],
})
export class OnemonsterComponent implements OnInit {

  constructor(private webService: WebService,
              private route: ActivatedRoute) {}


  async ngOnInit() {
    var response = await this.webService.getOneMonster(this.route.snapshot.params['name']);
    this.monster = response;
  }
  monster: any;
}
