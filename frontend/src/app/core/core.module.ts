import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ConcreteMonitoredKeywordsController, 
  MonitoredEntitiesController, 
  MonitoredIntervalController, 
  MonitoredKeywordsController } from "./controllers";
import { AvailablePartiesApiModel, 
  AvailablePartiesModel, 
  BackendQueryAPIModel, 
  BackendQueryModel, 
  MonitoredEntitiesLocalStorageModel,
  MonitoredEntitiesModel, 
  MonitoredIntervalModel,
  MonitoredIntervalLocalStorageModel,
  MonitoredKeywordsLocalStorageModel, 
  MonitoredKeywordsModel } from "./models";
import { BackendService, CamaraService } from "./services";
import { AvailablePartiesView, 
  ConcreteMonitoredKeywordsView, 
  MonitoredEntitiesView, 
  MonitoredIntervalView,
   MonitoredKeywordsView } from "./views";

@NgModule({
  providers: [
    // Services Providers
    { provide: CamaraService, useClass: CamaraService },
    { provide: BackendService, useClass: BackendService },

    // Models Providers
    {
      provide: BackendQueryModel,
      useClass: BackendQueryAPIModel,
    },
    {
      provide: AvailablePartiesModel,
      useClass: AvailablePartiesApiModel,
    },
    {
      provide: MonitoredKeywordsModel,
      useClass: MonitoredKeywordsLocalStorageModel,
    },
    {
      provide: MonitoredEntitiesModel,
      useClass: MonitoredEntitiesLocalStorageModel,
    },
    { provide: MonitoredIntervalModel,
      useClass: MonitoredIntervalLocalStorageModel,
    },

    // Views Providers
    {
      provide: AvailablePartiesView,
      useClass: AvailablePartiesView,
    },
    {
      provide: MonitoredEntitiesView,
      useClass: MonitoredEntitiesView,
    },
    {
      provide: MonitoredIntervalView,
      useClass: MonitoredIntervalView,
    },
    {
      provide: MonitoredKeywordsView,
      useClass: ConcreteMonitoredKeywordsView,
    },

    // Controllers Providers
    {
      provide: MonitoredEntitiesController,
      useClass: MonitoredEntitiesController,
    },
    {
      provide: MonitoredIntervalController,
      useClass: MonitoredIntervalController,
    },
    {
      provide: MonitoredKeywordsController,
      useClass: ConcreteMonitoredKeywordsController,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {}
