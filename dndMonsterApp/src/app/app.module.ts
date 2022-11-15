import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { MonsterComponent } from './monster/monster.component';


@NgModule({
  declarations: [AppComponent, MonsterComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [WebService],
  bootstrap: [AppComponent],
})
export class AppModule {}
