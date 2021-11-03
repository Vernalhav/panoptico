import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MonitoredEntitiesController } from './controller/monitored-entities.controller';
import {
  ConcreteMonitoredKeywordsController,
  MonitoredKeywordsController,
} from './controller/monitored-keywords.controller';
import { AvailablePartiesModel } from './model/available-parties.model';
import { AvailablePartiesApiModel } from './model/impl/available-parties.api.model';
import { MonitoredEntitiesLocalStorageModel } from './model/impl/monitored-entitites.local-storage.model';
import { MonitoredKeywordsLocalStorageModel } from './model/impl/monitored-keywords.local-storage.model';
import { MonitoredEntitiesModel } from './model/monitored-entities.model';
import { MonitoredKeywordsModel } from './model/monitored-keywords.model';
import { AvailablePartiesView } from './view/available-parties.view';
import { MonitoredEntitiesView } from './view/monitored-entities.view';
import {
  ConcreteMonitoredKeywordsView,
  MonitoredKeywordsView,
} from './view/monitored-keywords.view';

@NgModule({
  providers: [
    {
      provide: MonitoredKeywordsModel,
      useClass: MonitoredKeywordsLocalStorageModel,
    },
    {
      provide: MonitoredKeywordsView,
      useClass: ConcreteMonitoredKeywordsView,
    },
    {
      provide: MonitoredKeywordsController,
      useClass: ConcreteMonitoredKeywordsController,
    },
    {
      provide: AvailablePartiesModel,
      useClass: AvailablePartiesApiModel,
    },
    {
      provide: AvailablePartiesView,
      useClass: AvailablePartiesView,
    },
    {
      provide: MonitoredEntitiesModel,
      useClass: MonitoredEntitiesLocalStorageModel,
    },
    {
      provide: MonitoredEntitiesView,
      useClass: MonitoredEntitiesView,
    },
    {
      provide: MonitoredEntitiesController,
      useClass: MonitoredEntitiesController,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {}
