// ``import { Injectable } from '@angular/core';
// import { MonitoredEntitiesModel } from '../model/monitored-entities.model';
// import { MonitoredIntervalModel } from '../model/monitored-interval.model';
// import { MonitoredKeywordsModel } from '../model/monitored-keywords.model';

// @Injectable()
// export class MonitoringParamsView {
//   constructor(
//     private readonly monitoredEntitiesModel: MonitoredEntitiesModel,
//     private readonly monitoredKeywordModel: MonitoredKeywordsModel,
//     private readonly monitoredIntervalModel: MonitoredIntervalModel,
//   ) {}

//   public getParams() {
//     return {
//       partidos: Array.from(
//         this.monitoredEntitiesModel.monitoredPartiesIds.value,
//       ),
//       deputados: Array.from(
//         this.monitoredEntitiesModel.monitoredCongresspeopleIds.value,
//       ),
//       temas: this.monitoredKeywordModel.monitoredKeywords.value.filter(
//         (k) => !k.isRegex,
//       ),
//       regex: this.monitoredKeywordModel.monitoredKeywords.value.filter(
//         (k) => k.isRegex,
//       ),
//       inicio: this.monitoredIntervalModel.start.toISOString().slice(0, 10),
//       fim: this.monitoredIntervalModel.end.toISOString().slice(0, 10),
//     };
//   }
// }
