import { Injectable } from '@angular/core';
import { IAPIVotingBySubject } from 'src/app/core/interfaces/voting-by-subject.interface';
import { IAPIVoting } from 'src/app/core/interfaces/votings.interface';
import { BackendService } from 'src/app/core/services/backend/backend.service';
import { BackendQueryModel } from '../backend-query.model';
import { PublishableValue } from '../common/publishable-value';
import { VotingBySubject } from '../entities/voting-by-subject.entity';
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
      ...this.monitoredEntitiesParams,
    };
  }

  private static deserializeVotingFromAPI(v: IAPIVoting): Voting {
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

  private static deserializeVotingBySubjectFromAPI(v: IAPIVotingBySubject): VotingBySubject {
    return new VotingBySubject(
      v.id,
      v.entityName,
      v.type,
      v.subjects
    );
  }

  private static deserializeVotingArrayFromAPI(votings: IAPIVoting[]) {
    return votings.map((v) => BackendQueryAPIModel.deserializeVotingFromAPI(v));
  }

  private static deserializeVotingBySubjectArrayFromAPI(votings: IAPIVotingBySubject[]) {
    return votings.map((v) => BackendQueryAPIModel.deserializeVotingBySubjectFromAPI(v));
  }

  private publishVotingFromAPI(
    value: PublishableValue<Voting[]>,
    votings: IAPIVoting[],
  ) {
    value.publish(BackendQueryAPIModel.deserializeVotingArrayFromAPI(votings));
  }

  private publishVotingBySubjectFromAPI(
    value: PublishableValue<VotingBySubject[]>,
    votings: IAPIVotingBySubject[],
  ) {
    value.publish(BackendQueryAPIModel.deserializeVotingBySubjectArrayFromAPI(votings));
  }

  private updateVotingsFromMonitoredEntities() {
    const params = this.monitoredEntitiesParams;
    this.backendService
      .getVotingsByEntities(params)
      .subscribe((data) =>
        this.publishVotingFromAPI(this._votingsFromMonitoredEntities, data),
      );
  }

  private updateVotingsFromMonitoredSubjects() {
    const params = this.monitoredSubjectsParams;
    this.backendService
      .getVotingsBySubjects(params)
      .subscribe((data) =>
        this.publishVotingBySubjectFromAPI(this._votingsFromMonitoredSubjects, data),
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
