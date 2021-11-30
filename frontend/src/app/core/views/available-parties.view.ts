import { Injectable } from '@angular/core';
import { Party } from '../entities';
import { AvailablePartiesModel } from '../models';

@Injectable()
export class AvailablePartiesView {
  availableParties: Party[] = [];

  constructor(protected readonly model: AvailablePartiesModel) {
    this.model.availableParties.subscribe(async (parties) => {
      this.availableParties = parties;
    });
  }
}
