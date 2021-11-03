import { Injectable } from '@angular/core';
import { Congressperson } from '../entities/congressperson.entity';
import { Party } from '../entities/party.entity';
import { MonitoredEntitiesModel } from '../monitored-entities.model';

interface LocalStorageParty {
  id: number;
  name: string;
  acronym: string;
  members: number[];
}

interface LocalStorageCongressperson {
  id: number;
  name: string;
  state: string;
  partyId?: number;
}

class EntitiesLocalStorageRepository {
  private static readonly PARTIES_KEY = 'parties';
  private static readonly CONGRESSPEOPLE_KEY = 'congresspeople';
  private parties: { [key: string]: Party } = {};
  private congresspeople: { [key: string]: Congressperson } = {};

  constructor() {
    this.deserializeAll();
  }

  private serializeAll() {
    this.serializeAllParties();
    this.serializeAllCongresspeople();
  }

  private deserializeAll() {
    this.deserializeAllParties();
    this.deserializeAllCongresspeople();
  }

  private serializeAllParties() {
    localStorage.setItem(
      EntitiesLocalStorageRepository.PARTIES_KEY,
      JSON.stringify(
        Object.values(this.parties).map((party) => this.serializeParty(party)),
      ),
    );
  }

  private serializeAllCongresspeople() {
    localStorage.setItem(
      EntitiesLocalStorageRepository.CONGRESSPEOPLE_KEY,
      JSON.stringify(
        Object.values(this.congresspeople).map((congressperson) =>
          this.serializeCongressperson(congressperson),
        ),
      ),
    );
  }

  private deserializeAllParties() {
    this.parties = {};
    try {
      const parties = JSON.parse(
        localStorage.getItem(EntitiesLocalStorageRepository.PARTIES_KEY) ||
          '[]',
      ) as LocalStorageParty[];
      parties.forEach((party) => {
        this.parties[party.id] = this.deserializeParty(party);
      });
    } catch (err) {
      this.parties = {};
      this.serializeAllParties();
    }
  }

  private deserializeAllCongresspeople() {
    this.congresspeople = {};
    try {
      const congresspeople = JSON.parse(
        localStorage.getItem(
          EntitiesLocalStorageRepository.CONGRESSPEOPLE_KEY,
        ) || '[]',
      ) as LocalStorageCongressperson[];
      congresspeople.forEach((congressperson) => {
        this.congresspeople[congressperson.id] =
          this.deserializeCongressperson(congressperson);
      });
    } catch (err) {
      this.congresspeople = {};
      this.serializeAllCongresspeople();
    }
  }

  private serializeParty(party: Party): LocalStorageParty {
    return {
      id: party.id,
      name: party.name,
      acronym: party.acronym,
      members: party.members.map((m) => m.id),
    };
  }

  private serializeCongressperson(
    congressperson: Congressperson,
  ): LocalStorageCongressperson {
    return {
      id: congressperson.id,
      name: congressperson.name,
      state: congressperson.state,
      partyId: congressperson.party?.id,
    };
  }

  private deserializeParty(
    _party: LocalStorageParty,
    members: LocalStorageCongressperson[] = [],
  ): Party {
    const party = new Party(_party.id, _party.name, _party.acronym);
    party.members.push(
      ...members.map((m) => new Congressperson(m.id, m.name, m.state, party)),
    );
    return party;
  }

  private deserializeCongressperson(
    congressperson: LocalStorageCongressperson,
  ): Congressperson {
    const party = this.parties[congressperson.partyId + ''];
    if (congressperson.partyId !== undefined && party === undefined) {
      throw new Error(
        `Congressperson ${congressperson.id} has party ${congressperson.partyId} but no party with that id was found`,
      );
    }
    return new Congressperson(
      congressperson.id,
      congressperson.name,
      congressperson.state,
      party,
    );
  }
}

interface LocalStorageMonitoredEntities {
  parties: number[];
  congresspeople: number[];
}

@Injectable()
export class MonitoredEntitiesLocalStorageModel extends MonitoredEntitiesModel {
  private static readonly STORAGE_KEY = 'monitoredEntities';

  constructor() {
    super();
    this.deserialize();
    this._monitoredCongresspeopleIds.subscribe(async () => {
      this.serialize();
    });
    this._monitoredPartiesIds.subscribe(async () => {
      this.serialize();
    });
  }

  protected deserialize(): void {
    let parties: number[] = [];
    let congresspeople: number[] = [];
    try {
      const result = JSON.parse(
        localStorage.getItem(MonitoredEntitiesLocalStorageModel.STORAGE_KEY) +
          '',
      ) as LocalStorageMonitoredEntities;
      parties = result.parties;
      congresspeople = result.congresspeople;
    } catch (_) {
      localStorage.setItem(
        MonitoredEntitiesLocalStorageModel.STORAGE_KEY,
        JSON.stringify({
          parties: [],
          congresspeople: [],
        }),
      );
    } finally {
      this._monitoredCongresspeopleIds.publish(new Set(congresspeople));
      this._monitoredPartiesIds.publish(new Set(parties));
    }
  }

  protected serialize(): void {
    localStorage.setItem(
      MonitoredEntitiesLocalStorageModel.STORAGE_KEY,
      JSON.stringify({
        parties: Array.from(this._monitoredPartiesIds.value),
        congresspeople: Array.from(this._monitoredCongresspeopleIds.value),
      }),
    );
  }
}
