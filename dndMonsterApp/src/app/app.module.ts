import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { MonsterComponent } from './monster/monster.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { OnemonsterComponent } from './onemonster/onemonster.component';
import { AuthModule } from '@auth0/auth0-angular';
import { MatListModule } from '@angular/material/list';  
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {JitCompilerFactory} from '@angular/platform-browser-dynamic';
import {Compiler, COMPILER_OPTIONS, CompilerFactory} from '@angular/core';
import {MatIconModule} from '@angular/material/icon'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavcomponentComponent } from './navcomponent/navcomponent.component';


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
  declarations: [AppComponent, MonsterComponent, HomeComponent, OnemonsterComponent, NavcomponentComponent],
  imports: [
    BrowserModule, 
    MatIconModule,
    BrowserAnimationsModule,
    MatListModule,
    MatSidenavModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'fullstackdevmc.uk.auth0.com',
      clientId: 'VGeVxAOdbT1yJy7hvQNuMfJ217kPlkjo'
    }),
    RouterModule.forRoot(routes),
    MatPaginatorModule,
    MatListModule
  ],
  providers: [
    {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]},
    [WebService]
  ],
  exports : [MatListModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
