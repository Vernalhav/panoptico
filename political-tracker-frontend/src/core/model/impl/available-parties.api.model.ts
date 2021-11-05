import { Injectable } from '@angular/core';
import IAPICongressperson from 'src/app/core/interfaces/congressperson.interface';
import IAPIParty from 'src/app/core/interfaces/party.interface';
import { BackendService } from 'src/app/core/services/backend/backend.service';
import { AvailablePartiesModel } from '../available-parties.model';
import { Congressperson } from '../entities/congressperson.entity';
import { Party } from '../entities/party.entity';

@Injectable()
export class AvailablePartiesApiModel extends AvailablePartiesModel {
  constructor(private readonly backend: BackendService) {
    super();
    this.fetch();
  }

  private static ApiCongresspersonInterfaceToEntity(
    cp: IAPICongressperson,
    party?: Party,
  ): Congressperson {
    return new Congressperson(cp.id, cp.name, cp.state, party);
  }

  private static ApiPartyInterfaceToEntity(apiParty: IAPIParty): Party {
    const party = new Party(apiParty.id, apiParty.name, apiParty.acronym);
    const members = (apiParty.members || []).map((m) =>
      AvailablePartiesApiModel.ApiCongresspersonInterfaceToEntity(m, party),
    );
    party.members.push(...members);
    return party;
  }

  private fetch() {
    this.backend
      .getParties(true)
      .subscribe((parties) =>
        this._availableParties.publish(
          parties.map(AvailablePartiesApiModel.ApiPartyInterfaceToEntity),
        ),
      );
  }
}
