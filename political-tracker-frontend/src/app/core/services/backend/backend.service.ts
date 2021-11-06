import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IAPIParty from '../../interfaces/party.interface';
import IAPICongressperson from '../../interfaces/congressperson.interface';
import {
  IAPIVoting,
  IAPIVotingsRequest,
} from '../../interfaces/votings.interface';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private request<R>(
    method: string,
    url: string,
    data?: any,
    responseType?: any,
    params?: any,
  ) {
    const result = this.http.request<R>(method, url, {
      body: data,
      responseType: responseType || 'json',
      observe: 'body',
      headers: {},
      params,
    });

    return result;
  }

  getParties(includeMembers = true) {
    if (includeMembers) {
      return this.request<IAPIParty[]>(
        'get',
        `${this.baseUrl}/partidos/membros`,
      );
    }
    return this.request<IAPIParty[]>('get', `${this.baseUrl}/partidos`);
  }

  getCongressPeople() {
    return this.request<IAPICongressperson[]>(
      'get',
      `${this.baseUrl}/deputados`,
    );
  }

  getVotingsByEntities(req: IAPIVotingsRequest) {
    return this.request<IAPIVoting[]>(
      'get',
      `${this.baseUrl}/votacoes/entidades/`,
      undefined,
      undefined,
      req,
    );
  }

  getVotingsBySubjects(req: IAPIVotingsRequest) {
    return this.request<IAPIVoting[]>(
      'get',
      `${this.baseUrl}/votacoes/topicos`,
      undefined,
      undefined,
      req,
    );
  }
}
