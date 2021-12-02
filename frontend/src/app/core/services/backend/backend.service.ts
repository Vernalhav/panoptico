import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Congressperson, Party, Subject, Voting } from '../../entities';
import { IAPICongresspersonResponse, IAPIMonitorSubjectsResponse, IAPIMonitorVotingsResponse, IAPIPartiesResponse, IAPIVotingsRequest } from '.';


@Injectable({ providedIn: 'root' })
export class BackendService {
  private static config: any = environment.services.backend;

  constructor(private http: HttpClient) {}

  private request<R>(
    method: string,
    path: string,
    options?: { params?: any; data?: any },
  ): Observable<R> {
    return this.http.request<R>(method, `${BackendService.config.BASE_URL}${path}`, {
        params: options?.params || undefined,
        body: options?.data || undefined,
        responseType: 'json',
      },
    );
  }

  getParties(): Observable<Party[]> {
    return this.request<IAPIPartiesResponse>('GET', BackendService.config.GET_PARTIES_PATH)
      .pipe( map(r => r.parties) )
  }

  getPartiesWithMembers(): Observable<Party[]> {
    return this.request<IAPIPartiesResponse>('GET', BackendService.config.GET_PARTIES_WITH_MEMBERS_PATH)
    .pipe( map(r  => r.parties) )
  }

  getCongressPeople(): Observable<Congressperson[]> {
    return this.request<IAPICongresspersonResponse>('GET', BackendService.config.GET_CONGRESSPEOPLE_PATH)
    .pipe( map(r => r.congresspeople) )
  }

  getVotingsByEntities(req: IAPIVotingsRequest): Observable<Voting[]> {
    return this.request<IAPIMonitorVotingsResponse>('GET', BackendService.config.GET_MONITOR_VOTINGS, { params: req })
      .pipe( map(r => r.votings) )
  }

  getVotingsBySubjects(req: IAPIVotingsRequest): Observable<Subject[]> {
    return this.request<IAPIMonitorSubjectsResponse>('GET', BackendService.config.GET_MONITOR_SUBJECTS, { params: req })
      .pipe( map(r => r.subjects) )
  }
}
