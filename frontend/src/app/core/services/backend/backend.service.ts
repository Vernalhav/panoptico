import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IAPIParty from '../../interfaces/party.interface';
import IAPICongressperson from '../../interfaces/congressperson.interface';
import {
  IAPIVoting,
  IAPIVotingsRequest,
} from '../../interfaces/votings.interface';
import {
  API_BASE_URL,
  API_GET_CONGRESSPEOPLE_ROUTE,
  API_GET_PARTIES_WITH_MEMBERS_ROUTE,
  API_GET_PARTIES_ROUTE,
  API_GET_VOTING_BY_ENTITIES_ROUTE,
  API_GET_VOTTING_BY_SUBJECT_ROUTE,
} from 'src/config/api-routes.config';
import { IAPIVotingBySubject } from '../../interfaces/voting-by-subject.interface';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  private request<R>(
    method: string,
    url: string,
    params?: any,
    data?: any,
    responseType?: any,
  ) {
    const result = this.http.request<R>(method, url, {
      body: data,
      params,
      responseType: responseType || 'json',
      observe: 'body',
      headers: {},
    });

    return result;
  }

  getParties(includeMembers = true) {
    if (includeMembers) {
      return this.request<IAPIParty[]>(
        'get',
        `${API_BASE_URL}${API_GET_PARTIES_WITH_MEMBERS_ROUTE}`,
      );
    }
    return this.request<IAPIParty[]>(
      'get',
      `${API_BASE_URL}${API_GET_PARTIES_ROUTE}`,
    );
  }

  getCongressPeople() {
    return this.request<IAPICongressperson[]>(
      'get',
      `${API_BASE_URL}${API_GET_CONGRESSPEOPLE_ROUTE}`,
    );
  }

  getVotingsByEntities(req: IAPIVotingsRequest) {
    return this.request<IAPIVoting[]>(
      'get',
      `${API_BASE_URL}${API_GET_VOTING_BY_ENTITIES_ROUTE}`,
      req,
    );
  }

  getVotingsBySubjects(req: IAPIVotingsRequest) {
    return this.request<IAPIVotingBySubject[]>(
      'get',
      `${API_BASE_URL}${API_GET_VOTTING_BY_SUBJECT_ROUTE}`,
      req,
    );
  }
}
