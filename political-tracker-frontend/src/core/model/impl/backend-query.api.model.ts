import { Injectable } from '@angular/core';
import { IAPIVoting } from 'src/app/core/interfaces/votings.interface';
import { BackendService } from 'src/app/core/services/backend/backend.service';
import { BackendQueryModel } from '../backend-query.model';
import { PublishableValue } from '../common/publishable-value';
import { Voting } from '../entities/voting.entity';
import { MonitoredEntitiesModel } from '../monitored-entities.model';
import { MonitoredIntervalModel } from '../monitored-interval.model';
import { MonitoredKeywordsModel } from '../monitored-keywords.model';

@Injectable()
export class BackendQueryAPIModel extends BackendQueryModel {
  private get monitoredIntervalParams() {
    return {
      startDate: this.monitoredInterval.start.value.toISOString().slice(0, 10),
      endDate: this.monitoredInterval.end.value.toISOString().slice(0, 10),
    };
  }

  private get monitoredEntitiesParams() {
    return {
      partiesIds: Array.from(this.monitoredEntities.monitoredPartiesIds.value),
      congresspersonIds: Array.from(
        this.monitoredEntities.monitoredCongresspeopleIds.value,
      ),
      ...this.monitoredIntervalParams,
    };
  }

  private get monitoredSubjectsParams() {
    return {
      subjects: Array.from(
        this.monitoredKeywords.monitoredKeywords.value
          .filter((k) => !k.isRegex)
          .map((k) => k.word),
      ),
      regexSubjects: Array.from(
        this.monitoredKeywords.monitoredKeywords.value

          .filter((k) => k.isRegex)
          .map((k) => k.word),
      ),
      ...this.monitoredIntervalParams,
    };
  }

  private static deserializeFromAPI(v: IAPIVoting): Voting {
    return new Voting(
      v.idVotacao,
      v.dataVotacao,
      (Array.isArray(v.temas) ? v.temas?.join('; ') : v.temas) + '',
      v.total,
      v.sim,
      v.nao,
      v.abstencao,
      v.outros,
    );
  }

  private static deserializeArrayFromAPI(votings: IAPIVoting[]) {
    return votings.map((v) => BackendQueryAPIModel.deserializeFromAPI(v));
  }

  private publishFromAPI(
    value: PublishableValue<Voting[]>,
    votings: IAPIVoting[],
  ) {
    value.publish(BackendQueryAPIModel.deserializeArrayFromAPI(votings));
  }

  private updateVotingsFromMonitoredEntities() {
    const params = this.monitoredEntitiesParams;
    this.backendService
      .getVotings(params)
      .subscribe((data) =>
        this.publishFromAPI(this._votingsFromMonitoredEntities, data),
      );
  }

  private updateVotingsFromMonitoredSubjects() {
    const params = this.monitoredSubjectsParams;
    this.backendService
      .getVotings(params)
      .subscribe((data) =>
        this.publishFromAPI(this._votingsFromMonitoredSubjects, data),
      );
  }

  constructor(
    private readonly monitoredEntities: MonitoredEntitiesModel,
    private readonly monitoredKeywords: MonitoredKeywordsModel,
    private readonly monitoredInterval: MonitoredIntervalModel,
    private readonly backendService: BackendService,
  ) {
    super();
    this.monitoredEntities.monitoredPartiesIds.subscribe(async () =>
      this.updateVotingsFromMonitoredEntities(),
    );
    this.monitoredKeywords.monitoredKeywords.subscribe(async () =>
      this.updateVotingsFromMonitoredSubjects(),
    );
    this.monitoredInterval.start.subscribe(async () => {
      this.updateVotingsFromMonitoredEntities();
      this.updateVotingsFromMonitoredSubjects();
    });
    this.monitoredInterval.end.subscribe(async () => {
      this.updateVotingsFromMonitoredEntities();
      this.updateVotingsFromMonitoredSubjects();
    });

    this.updateVotingsFromMonitoredEntities();
    this.updateVotingsFromMonitoredSubjects();
  }
}
