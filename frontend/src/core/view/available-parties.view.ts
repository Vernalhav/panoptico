import { Injectable } from '@angular/core';
import { AvailablePartiesModel } from '../model/available-parties.model';
import { Party } from '../model/entities/party.entity';

@Injectable()
export class AvailablePartiesView {
  availableParties: Party[] = [];

  constructor(protected readonly model: AvailablePartiesModel) {
    this.model.availableParties.subscribe(async (parties) => {
      this.availableParties = parties;
    });
  }
}
