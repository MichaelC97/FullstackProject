import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../web.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-createmonster',
  templateUrl: './createmonster.component.html',
  styleUrls: ['./createmonster.component.css']
})
export class CreatemonsterComponent implements OnInit {
  monsterForm : any;
  newMonster : any;

  constructor(public webService: WebService, private router: Router, public http: HttpClient, private route : ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.monsterForm = this.formBuilder.group({

            name: ['',Validators.required],
            size: ['',Validators.required],
            type: ['',Validators.required],
            alignment: ['',Validators.required],
            armor_class: ['',Validators.required],
            hit_points: ['',Validators.required],
            hit_dice: ['',Validators.required],

            WalkSpeed: '',
            SwimSpeed: '',
            FlySpeed: '',
            ClimbSpeed: '',
            BurrowSpeed: '',

            strength: ['',Validators.required],
            dexterity: ['',Validators.required],
            constitution: ['',Validators.required],
            intelligence: ['',Validators.required],
            wisdom: ['',Validators.required],
            charisma: ['',Validators.required],

            damage_vinerabilities: '',
            damage_resistances: '',
            damage_immunities: '',
            condition_immunities: '',

            Passive_Perception: ['',Validators.required],
            DarkVison: '',
            Truesight: '',
            Tremorsense: '',
            Blindsight: '',
            languages: ['',Validators.required],
            challenge_rating: ['',Validators.required],

            special_abilities_name: '',
            special_abilities_desc: '',
            actions_name: ['',Validators.required],
            actions_desc: ['',Validators.required],

            legendary_actions_name: '',
            legendary_actions_name2: '',
            legendary_actions_name3: '',

            legendary_actions_desc: '',
            legendary_actions_desc2: '',
            legendary_actions_desc3: '',


    })
  }

  isInvalid(control: any){
    return this.monsterForm.controls[control].invalid && 
           this.monsterForm.controls[control].touched;
  }

  isUntouched(){

    return this.monsterForm.controls.name.pristine ||
           this.monsterForm.controls.size.pristine ||
           this.monsterForm.controls.type.pristine ||
           this.monsterForm.controls.armor_class.pristine ||
           this.monsterForm.controls.hit_points.pristine ||

           this.monsterForm.controls.strength.pristine ||
           this.monsterForm.controls.dexterity.pristine ||
           this.monsterForm.controls.constitution.pristine ||
           this.monsterForm.controls.intelligence.pristine ||
           this.monsterForm.controls.wisdom.pristine ||
           this.monsterForm.controls.charisma.pristine ||

           this.monsterForm.controls.Passive_Perception.pristine ||
           this.monsterForm.controls.languages.pristine ||
           this.monsterForm.controls.challenge_rating.pristine ||
           this.monsterForm.controls.actions_name.pristine ||
           this.monsterForm.controls.actions_desc.pristine;
  }

  isIncomplete(){
    return this.isInvalid('name') ||
    this.isInvalid('size') ||
    this.isInvalid('type') ||
    this.isInvalid('alignment') ||
    this.isInvalid('armor_class') ||
    this.isInvalid('hit_points') ||

    this.isInvalid('strength') ||
    this.isInvalid('dexterity') ||
    this.isInvalid('constitution') ||
    this.isInvalid('intelligence') ||
    this.isInvalid('wisdom') ||
    this.isInvalid('charisma') ||

    this.isInvalid('Passive_Perception') ||
    this.isInvalid('languages') ||
    this.isInvalid('challenge_rating') ||
    this.isInvalid('actions_name') ||
    this.isInvalid('actions_desc') ||

    this.isUntouched()

  }
  createMonster() {
    this.webService.submitMonster(this.monsterForm.value)
      .subscribe((Response: any) => {
        this.monsterForm.reset();
        this.router.navigate([Response]);
      });
  }


}
