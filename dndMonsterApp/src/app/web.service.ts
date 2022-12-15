import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {
    monster_list: any;
    monsters_found: any;
    actions_found: any; 
    encounter_list: any;
  userMonsers: any;

  constructor(public http: HttpClient) {}
  getMonster() {
    return this.http
      .get('http://localhost:5000/api/v1.0/allmonsters')
      .subscribe((Response: any) => {
        this.monster_list = Response;
      });
  }

  getOneMonster(monstername: any) {
    return this.http
      .get('http://localhost:5000/api/v1.0/monsters/' + monstername)
      .subscribe((Response: any) => {
        this.monsters_found = Response;
        this.monsters_found = Response.monstersCreated[0];
        console.log(this.monsters_found);
      });
  }

  getMonsterActions(monstername: any ){
    return this.http.get(
      'http://localhost:5000/api/v1.0/monsters/' + monstername + '/actions')
      .subscribe((Response: any) => {
        this.actions_found = Response;
      });
  }

  deleteMonster(monstername : any, userEmail : any){ 
    return this.http.delete(
      'http://localhost:5000/api/v1.0/monster/delete/' + monstername + "/" + userEmail)
      .subscribe((Response: any) => {
        this.getAllEncounters(userEmail)
      });
  }

  submitMonster(userEmail : any, monsterForm : any){
    let postData = new FormData();
    postData.append("name", monsterForm.name);
    postData.append("size", monsterForm.size);
    postData.append("type", monsterForm.type);
    postData.append("subtype", monsterForm.subtype);
    postData.append("alignment", monsterForm.alignment);
    postData.append("armor_class", monsterForm.armor_class);
    postData.append("hit_points", monsterForm.hit_points);
    postData.append("hit_dice", monsterForm.hit_dice);

    postData.append("WalkSpeed", monsterForm.WalkSpeed);
    postData.append("SwimSpeed", monsterForm.SwimSpeed);
    postData.append("FlySpeed", monsterForm.FlySpeed);
    postData.append("ClimbSpeed", monsterForm.ClimbSpeed);
    postData.append("BurrowSpeed", monsterForm.BurrowSpeed);

    postData.append("strength", monsterForm.strength);
    postData.append("dexterity", monsterForm.dexterity);
    postData.append("constitution", monsterForm.constitution);
    postData.append("intelligence", monsterForm.intelligence);
    postData.append("wisdom", monsterForm.wisdom);
    postData.append("charisma", monsterForm.charisma);

    postData.append("damage_vinerabilities", monsterForm.damage_vinerabilities);
    postData.append("damage_resistances", monsterForm.damage_resistances);
    postData.append("damage_immunities", monsterForm.damage_immunities);
    postData.append("condition_immunities", monsterForm.condition_immunities);

    postData.append("Passive_Perception", monsterForm.Passive_Perception);
    postData.append("DarkVison", monsterForm.DarkVison);
    postData.append("Truesight", monsterForm.Truesight);
    postData.append("Tremorsense", monsterForm.Tremorsense);
    postData.append("Blindsight", monsterForm.Blindsightame);
    postData.append("languages", monsterForm.languages);

    postData.append("challenge_rating", monsterForm.challenge_rating);
    postData.append("special_abilities_name", monsterForm.special_abilities_name);
    postData.append("special_abilities_desc", monsterForm.special_abilities_desc);
    postData.append("actions_name", monsterForm.actions_name);
    postData.append("actions_desc", monsterForm.actions_desc);

    postData.append("legendary_actions_name", monsterForm.legendary_actions_name);
    postData.append("legendary_actions_name1", monsterForm.legendary_actions_name1);
    postData.append("legendary_actions_name2", monsterForm.legendary_actions_name2);
    postData.append("legendary_actions_name3", monsterForm.legendary_actions_name3);

    postData.append("legendary_actions_desc", monsterForm.legendary_actions_desc);
    postData.append("legendary_actions_desc2", monsterForm.legendary_actions_desc2);
    postData.append("legendary_actions_desc3", monsterForm.legendary_actions_desc3);


    return this.http.post('http://localhost:5000/api/v1.0/monsters/create'+ userEmail, postData);

  }

  editMonster(monsterForm : any, monsterName : any, userEmail : any){
    let postData = new FormData();
    postData.append("name", monsterForm.name + " Edited");
    postData.append("size", monsterForm.size);
    postData.append("type", monsterForm.type);
    postData.append("subtype", monsterForm.subtype);
    postData.append("alignment", monsterForm.alignment);
    postData.append("armor_class", monsterForm.armor_class);
    postData.append("hit_points", monsterForm.hit_points);
    postData.append("hit_dice", monsterForm.hit_dice);

    postData.append("WalkSpeed", monsterForm.WalkSpeed);
    postData.append("SwimSpeed", monsterForm.SwimSpeed);
    postData.append("FlySpeed", monsterForm.FlySpeed);
    postData.append("ClimbSpeed", monsterForm.ClimbSpeed);
    postData.append("BurrowSpeed", monsterForm.BurrowSpeed);

    postData.append("strength", monsterForm.strength);
    postData.append("dexterity", monsterForm.dexterity);
    postData.append("constitution", monsterForm.constitution);
    postData.append("intelligence", monsterForm.intelligence);
    postData.append("wisdom", monsterForm.wisdom);
    postData.append("charisma", monsterForm.charisma);

    postData.append("damage_vinerabilities", monsterForm.damage_vinerabilities);
    postData.append("damage_resistances", monsterForm.damage_resistances);
    postData.append("damage_immunities", monsterForm.damage_immunities);
    postData.append("condition_immunities", monsterForm.condition_immunities);

    postData.append("Passive_Perception", monsterForm.Passive_Perception);
    postData.append("DarkVison", monsterForm.DarkVison);
    postData.append("Truesight", monsterForm.Truesight);
    postData.append("Tremorsense", monsterForm.Tremorsense);
    postData.append("Blindsight", monsterForm.Blindsightame);
    postData.append("languages", monsterForm.languages);

    postData.append("challenge_rating", monsterForm.challenge_rating);
    postData.append("special_abilities_name", monsterForm.special_abilities_name);
    postData.append("special_abilities_desc", monsterForm.special_abilities_desc);
    postData.append("actions_name", monsterForm.actions_name);
    postData.append("actions_desc", monsterForm.actions_desc);

    postData.append("legendary_actions_name", monsterForm.legendary_actions_name);
    postData.append("legendary_actions_name1", monsterForm.legendary_actions_name1);
    postData.append("legendary_actions_name2", monsterForm.legendary_actions_name2);
    postData.append("legendary_actions_name3", monsterForm.legendary_actions_name3);

    postData.append("legendary_actions_desc", monsterForm.legendary_actions_desc);
    postData.append("legendary_actions_desc2", monsterForm.legendary_actions_desc2);
    postData.append("legendary_actions_desc3", monsterForm.legendary_actions_desc3);

    console.log("Made it into here")
    return this.http.put('http://localhost:5000/api/v1.0/monster/'+ monsterName + '/' + userEmail + '/edit', postData);
  }
  
  addToEncounter(userEmail : any, monsterName : any){
    
    return this.http.get(
      'http://localhost:5000/api/v1.0/monster/' + userEmail + '/' + monsterName)
      .subscribe((Response: any) => {
        this.getAllEncounters(userEmail);
      });
  }
  
  getAllEncounters(userEmail : any) {
    console.log("inside getAllEncounters")
    return this.http
      .get('http://localhost:5000/api/v1.0/allEncounters/' + userEmail)
      .subscribe((Response: any) => {
        this.encounter_list = Response.encounters;
      });
  }
  getUserMonsters(userEmail : any) {
    console.log("inside userMonsters")
    return this.http
      .get('http://localhost:5000/api/v1.0/userMonsters' + userEmail)
      .subscribe((Response: any) => {
        this.monster_list = Response.monstersCreated;
      });

  }


  sortAZ(columnToSort : any ){
    return this.http
    .get('http://localhost:5000/api/v1.0/sort/' + columnToSort + 'A')
    .subscribe((Response: any) => {
      this.monster_list = Response;
    });
}
sortZA(columnToSort : any ){
  return this.http
  .get('http://localhost:5000/api/v1.0/sort/' + columnToSort + 'Z')
  .subscribe((Response: any) => {
    this.monster_list = Response;
  });
}

}
