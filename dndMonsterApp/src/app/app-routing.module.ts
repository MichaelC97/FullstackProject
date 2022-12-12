import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonsterComponent } from './monster/monster.component';
import { OnemonsterComponent } from './onemonster/onemonster.component';
import { CreatemonsterComponent } from './createmonster/createmonster.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
    },
    {
    path: 'monsters',
    component: MonsterComponent
    },
    {
      path: 'monsters/:name',
      component: OnemonsterComponent
    },
    {
      path: 'monsters/edit',
      component: CreatemonsterComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
