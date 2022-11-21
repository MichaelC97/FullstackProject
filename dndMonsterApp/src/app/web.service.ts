import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class WebService {

monster_list: any;
    monsterFound: any;
findMonsterByName: any;
    constructor(public http: HttpClient) {}
    getMonster() {
        console.log("in here")
        return this.http.get(
            'http://localhost:5000/api/v1.0/allmonsters'
        ).subscribe((Response: any ) => {
            this.monster_list = Response;
        })
    }
    getOneMonster(monstername: string) {
        return this.http.get(
        'http://localhost:5000/api/v1.0/monsters/'+ monstername)
        .subscribe((Response : any ) => {
            this.findMonsterByName = Response;
            console.log(Response);
        })
    }
}