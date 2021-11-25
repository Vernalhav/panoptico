import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MonitoredEntitiesController } from './controller/monitored-entities.controller';
import { MonitoredIntervalController } from './controller/monitored-interval.controller';
import {
  ConcreteMonitoredKeywordsController,
  MonitoredKeywordsController,
} from './controller/monitored-keywords.controller';
import { AvailablePartiesModel } from './model/available-parties.model';
import { BackendQueryModel } from './model/backend-query.model';
import { AvailablePartiesApiModel } from './model/impl/available-parties.api.model';
import { BackendQueryAPIModel } from './model/impl/backend-query.api.model';
import { MonitoredEntitiesLocalStorageModel } from './model/impl/monitored-entitites.local-storage.model';
import { MonitoredKeywordsLocalStorageModel } from './model/impl/monitored-keywords.local-storage.model';
import { MonitoredEntitiesModel } from './model/monitored-entities.model';
import { MonitoredIntervalModel } from './model/monitored-interval.model';
import { MonitoredKeywordsModel } from './model/monitored-keywords.model';
import { AvailablePartiesView } from './view/available-parties.view';
import { MonitoredEntitiesView } from './view/monitored-entities.view';
import { MonitoredIntervalView } from './view/monitored-interval.view';
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
    {
      provide: MonitoredIntervalModel,
      useClass: MonitoredIntervalModel,
    },
    {
      provide: MonitoredIntervalModel,
      useClass: MonitoredIntervalModel,
    },
    {
      provide: MonitoredIntervalView,
      useClass: MonitoredIntervalView,
    },
    {
      provide: MonitoredIntervalController,
      useClass: MonitoredIntervalController,
    },
    {
      provide: BackendQueryModel,
      useClass: BackendQueryAPIModel,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {}
