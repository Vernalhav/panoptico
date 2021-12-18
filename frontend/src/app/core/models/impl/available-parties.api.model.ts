import { Injectable } from "@angular/core";
import { AvailablePartiesModel } from "..";
import { Congressperson, Party } from "../../entities";
import { BackendService } from "../../services";

@Injectable()
export class AvailablePartiesApiModel extends AvailablePartiesModel {
  
  constructor(private readonly backend: BackendService) {
    super();
    this.fetch();
  }

  // @TODO: Remover API
  // private static congresspersonDataToEntity(
  //   congressData: CongresspersonDTO,
  //   party?: Party,
  // ): Congressperson {
  //   return new Congressperson(congressData.id, congressData.name, congressData.state, party);
  // }

  // private static partyDataToEntity(partyData: PartyDTO): Party {
  //   const party = new Party(partyData.id, partyData.name, partyData.acronym);
  //   party.members = (partyData.members || []).map((m) =>
  //     AvailablePartiesApiModel.congresspersonDataToEntity(m, party),
  //   )
  //   return party;
  // }

  private fetch() {
    this.backend.getPartiesWithMembers()
      .subscribe((parties: Party[]) => this._availableParties.publish(parties))
  }
}
