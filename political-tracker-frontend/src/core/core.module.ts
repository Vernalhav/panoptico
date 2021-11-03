import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  ConcreteMonitoredKeywordsController,
  MonitoredKeywordsController,
} from './controller/monitored-keywords.controller';
import { AvailablePartiesModel } from './model/available-parties.model';
import { AvailablePartiesApiModel } from './model/impl/available-parties.api.model';
import { MonitoredKeywordsLocalStorageModel } from './model/impl/monitored-keywords.local-storage.model';
import { MonitoredKeywordsModel } from './model/monitored-keywords.model';
import { AvailablePartiesView } from './view/available-parties.view';
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
  ],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {}
