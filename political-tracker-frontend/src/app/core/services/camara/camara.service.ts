import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VotingDetailsResponse } from './camara.types';
import { map } from 'rxjs/operators';

@Injectable()
export class CamaraService {
  private static url = 'https://dadosabertos.camara.leg.br/api/v2';

  constructor(private readonly http: HttpClient) {}

  getVotingDetails(id: string) {
    return this.http
      .get<{ dados: VotingDetailsResponse }>(
        `${CamaraService.url}/votacoes/${id}`,
      )
      .pipe(map((response) => response.dados));
  }
}
