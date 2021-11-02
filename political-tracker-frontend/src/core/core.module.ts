import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ConcreteMonitoredKeywordsController,
  MonitoredKeywordsController,
} from './controller/monitored-keywords.controller';
import { MonitoredKeywordsLocalStorageModel } from './model/impl/monitored-keywords.local-storge.model';
import { MonitoredKeywordsModel } from './model/monitored-keywords.model';
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
  ],
  imports: [CommonModule],
})
export class CoreModule {}
