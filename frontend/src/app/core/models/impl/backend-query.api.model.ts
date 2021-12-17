import { Injectable } from "@angular/core";
import { BackendQueryModel, MonitoredEntitiesModel, MonitoredIntervalModel, MonitoredKeywordsModel } from "..";
import { BackendService } from "../../services";

@Injectable()
export class BackendQueryAPIModel extends BackendQueryModel {
  
  constructor(
    private readonly monitoredEntities: MonitoredEntitiesModel,
    private readonly monitoredKeywords: MonitoredKeywordsModel,
    private readonly monitoredInterval: MonitoredIntervalModel,
    private readonly backendService: BackendService,
  ) {
    super();
  }
  
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

  private updateVotingsFromMonitoredEntities() {
    const params = this.monitoredEntitiesParams;
    this.backendService
      .getVotingsByEntities(params)
      .subscribe(votings => this._votingsFromMonitoredEntities.publish(votings))
  }

  private updateVotingsFromMonitoredSubjects() {
    const params = this.monitoredSubjectsParams;
    this.backendService
      .getVotingsBySubjects(params)
      .subscribe((subjects) => this._votingsFromMonitoredSubjects.publish(subjects))
  }

  private updateLawCountsFromEntities() {
    const params = this.monitoredSubjectsParams;
    this.backendService
      .getLawCountsByEntities(params)
      .subscribe((laws) => {
        this._lawCountsFromCongressperson.publish(laws.congresspeopleLawCounts);
        this._lawCountsFromParties.publish(laws.partiesLawCounts)
      })
  }

  public queryUsingCurrentFilters() {
    this.updateVotingsFromMonitoredEntities();
    this.updateVotingsFromMonitoredSubjects();
  }

  public queryVotingsFromEntities() {
    this.updateVotingsFromMonitoredEntities();
  }

  public querySubjectsFromEntities() {
    this.updateVotingsFromMonitoredSubjects();
  }

  public queryLawCountsFromEntities(){
    this.updateLawCountsFromEntities();
  }
}
