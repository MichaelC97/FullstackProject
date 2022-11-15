import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { MonsterComponent } from './monster/monster.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { OnemonsterComponent } from './onemonster/onemonster.component';


var routes: any = [
  {
    path: '',
    component: HomeComponent
    },
    {
    path: 'monsters',
    component: MonsterComponent
    },
    {
      path: 'monster/:name',
      component: OnemonsterComponent
    }
];

@NgModule({
  declarations: [AppComponent, MonsterComponent, HomeComponent, OnemonsterComponent],
  imports: [
    BrowserModule, 
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WebService],
  bootstrap: [AppComponent],
})
export class AppModule {}
