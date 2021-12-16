import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { ChartsModule } from 'ng2-charts';

import { CoreModule } from '../core/core.module';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { HomePageComponent } from './home-page/home-page.component';
import { VotingsPageComponent } from './votings-page/votings-page.component';
import { TabCloudsComponent } from './votings-page/tab-clouds/tab-clouds.component';
import { HomeComponent } from './home/home.component';
import { MonitorMenuComponent } from './monitor-menu/monitor-menu.component';
import { MonPartsAndDepsComponent } from './mon-parts-and-deps/mon-parts-and-deps.component';


@NgModule({
  declarations: [
    // Pages
    HomePageComponent, 
    VotingsPageComponent, 
    
    // Pages Components
    TabCloudsComponent, 

    // New Pages
    HomeComponent, MonitorMenuComponent, MonPartsAndDepsComponent,
  ],
  imports: [
    // Angular Imports
    CommonModule,
    RouterModule,
    
    // Material UI & Frameworks Imports
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ChartsModule,

    // Project Imports
    CoreModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class PagesModule {}
