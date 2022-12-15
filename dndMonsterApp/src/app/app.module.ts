import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { MonsterComponent } from './monster/monster.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { OnemonsterComponent } from './onemonster/onemonster.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { MatListModule } from '@angular/material/list';  
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {JitCompilerFactory} from '@angular/platform-browser-dynamic';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import {Compiler, COMPILER_OPTIONS, CompilerFactory} from '@angular/core';
import {MatIconModule} from '@angular/material/icon'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavcomponentComponent } from './navcomponent/navcomponent.component';
import { SettingsComponent } from './settings/settings.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CreatemonsterComponent } from './createmonster/createmonster.component';
import { EditMonsterComponent } from './edit-monster/edit-monster.component';

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
    },
    {
      path: 'monsters/:name/edit',
      component: EditMonsterComponent 
    },
    {
      path: 'settings',
      component: SettingsComponent
    },
    {
      path: 'monster/create',
      component: CreatemonsterComponent
    }
];

@NgModule({
  declarations: [AppComponent, MonsterComponent, HomeComponent, OnemonsterComponent, NavcomponentComponent, SettingsComponent, CreatemonsterComponent, EditMonsterComponent],
  imports: [
    BrowserModule, 
    MatIconModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatListModule,
    Ng2SearchPipeModule,
    FormsModule,
    MatSidenavModule,
    HttpClientModule,
    ReactiveFormsModule,
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
