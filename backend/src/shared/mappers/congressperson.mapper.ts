import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Mapper } from './base.mapper';
import { PartyMapper } from './party.mapper';
import { CongresspersonDTO } from 'src/shared/dto';
import { Congressperson } from 'src/entities';

@Injectable()
export class CongresspersonMapper extends Mapper<
  CongresspersonDTO,
  Congressperson
> {
  constructor(
    @Inject(forwardRef(() => PartyMapper))
    private partyMapper: PartyMapper,
  ) {
    super();
  }

  public mapFrom(data: CongresspersonDTO): Congressperson {
    const congressperson = new Congressperson();
    congressperson.id = data.id;
    congressperson.name = data.name;
    congressperson.state = data.state;
    congressperson.partyId = data.partyId;
    congressperson.partyId = data.partyId;
    congressperson.photoUrl = data.photoUrl;
    congressperson.email = data.email;
    congressperson.civilName = data.civilName;
    congressperson.scholarity = data.scholarity;
    congressperson.birthState = data.birthState;
    congressperson.birthCity = data.birthCity;
    congressperson.sex = data.sex;
    if (data.party) data.party = this.partyMapper.mapFrom(data.party);
    return congressperson;
  }

  public mapTo(data: Congressperson): CongresspersonDTO {
    return new CongresspersonDTO(
      data.id,
      data.name,
      data.state,
      data.partyId,
      data.photoUrl,
      data.email,
      data.civilName,
      data.scholarity,
      data.birthState,
      data.birthCity,
      data.sex,
      data.party,
    );
  }
}

@Injectable()
export class CongresspeopleMapper extends Mapper<
  CongresspersonDTO[],
  Congressperson[]
> {
  constructor(private congresspersonMapper: CongresspersonMapper) {
    super();
  }

  public mapFrom(data: CongresspersonDTO[]): Congressperson[] {
    return data.map((e) => this.congresspersonMapper.mapFrom(e));
  }

  public mapTo(data: Congressperson[]): CongresspersonDTO[] {
    return data.map((e) => this.congresspersonMapper.mapTo(e));
  }
}
