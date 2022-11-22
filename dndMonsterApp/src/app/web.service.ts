import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {
    monster_list: any;
    monsters_found: any;

  constructor(public http: HttpClient) {}
  getMonster(page: number) {
    return this.http
      .get('http://localhost:5000/api/v1.0/allmonsters?pn=' + page)
      .subscribe((Response: any) => {
        this.monster_list = Response;
      });
  }
  getOneMonster(monstername: any) {
    return this.http
      .get('http://localhost:5000/api/v1.0/monsters/' + monstername)
      .subscribe((Response: any) => {
        console.log( Response)
        this.monsters_found = Response;
      });
  }
}
