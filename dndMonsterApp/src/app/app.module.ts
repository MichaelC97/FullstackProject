import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { MonsterComponent } from './monster/monster.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { OnemonsterComponent } from './onemonster/onemonster.component';
import { MatListModule } from '@angular/material/list';  
import {JitCompilerFactory} from '@angular/platform-browser-dynamic';
import {Compiler, COMPILER_OPTIONS, CompilerFactory} from '@angular/core';


export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

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
      path: 'monsters/:name',
      component: OnemonsterComponent
    }
];

@NgModule({
  declarations: [AppComponent, MonsterComponent, HomeComponent, OnemonsterComponent],
  imports: [
    BrowserModule, 
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatListModule
  ],
  providers: [
    {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]},
    [WebService]
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
