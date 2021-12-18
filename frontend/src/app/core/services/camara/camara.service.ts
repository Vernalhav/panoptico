import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VotingDetailsResponse, ExpensesResponse } from './camara.types';

@Injectable({ providedIn: 'root' })
export class CamaraService {
  private static url = 'https://dadosabertos.camara.leg.br/api/v2';

  constructor(private readonly http: HttpClient) {}

  getVotingDetails(id: string): Observable<VotingDetailsResponse> {
    return this.http
      .get<{ dados: VotingDetailsResponse }>(
        `${CamaraService.url}/votacoes/${id}`,
      )
      .pipe(map((response) => response.dados));
  }

  getExpensesFromCongressperson(id: number): Observable<ExpensesResponse> {
    return this.http
    .get<{dados: ExpensesResponse}>(
      `${CamaraService.url}/deputados/${id}/despesas`,
    )
    .pipe(map((response) => response.dados));
  }
}