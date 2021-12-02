import { forwardRef, Inject, Injectable } from "@nestjs/common"
import { Mapper } from "./base.mapper"
import { CongresspersonMapper } from "./congressperson.mapper"
import { PartyDTO } from "src/shared/dto"
import { Party } from "src/entities"

@Injectable()
export class PartyMapper extends Mapper<PartyDTO, Party>{
  
  constructor(
    @Inject(forwardRef(() => CongresspersonMapper))
    private congresspersonMapper: CongresspersonMapper
  ) {
    super();
  }

  public mapFrom(data: PartyDTO): Party { 
    let party = new Party()
    party.id = data.id
    party.acronym = data.acronym
    party.name = data.name
    if(data.members)
      data.members.map((e) => this.congresspersonMapper.mapFrom)
    return party  
  }

  public mapTo(data: Party): PartyDTO { 
    return new PartyDTO(data.id, data.acronym, data.name, data?.members)
  }
}

@Injectable()
export class PartiesMapper extends Mapper<PartyDTO[], Party[]>{
  constructor(private partyMapper: PartyMapper) { 
    super();
  }

  public mapFrom(data: PartyDTO[]): Party[] { 
    return data.map((e) => this.partyMapper.mapFrom(e));   
  }

  public mapTo(data: Party[]): PartyDTO[] { 
    return data.map((e) => this.partyMapper.mapTo(e));
  }
}