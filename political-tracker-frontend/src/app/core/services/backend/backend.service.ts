import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Party from '../../interfaces/party.interface';
import Congressperson from '../../interfaces/congressperson.interface';

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
  ) {
    const result = this.http.request<R>(method, url, {
      body: data,
      responseType: responseType || 'json',
      observe: 'body',
      headers: {},
    });

    return result;
  }

  getParties(includeMembers = true) {
    if (includeMembers) {
      return this.request<Party[]>('get', `${this.baseUrl}/partidos/membros`);
    }
    return this.request<Party[]>('get', `${this.baseUrl}/partidos`);
  }

  getCongressPeople() {
    return this.request<Congressperson[]>('get', `${this.baseUrl}/deputados`);
  }
}
