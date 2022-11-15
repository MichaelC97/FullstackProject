import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class WebService {
    constructor(private http: HttpClient) {}
    getMonster() {
        return this.http.get(
            'http://localhost:5000/api/v1.0/allmonsters'
        ).toPromise();
    }
    getOneMonster(monstername: string) {
        return this.http.get(
        'http://localhost:5000/api/v1.0/monsters/'+ monstername)
        .toPromise();
        }
}