import { forwardRef, Inject, Injectable } from "@nestjs/common"
import { Mapper } from "./base.mapper"
import { PartyMapper } from "./party.mapper";
import { CongresspersonDTO } from "src/shared/dto"
import { Congressperson } from "src/entities"

@Injectable()
export class CongresspersonMapper extends Mapper<CongresspersonDTO, Congressperson>{
  
  constructor(
    @Inject(forwardRef(() => PartyMapper))
    private partyMapper: PartyMapper
  ) {
    super();
  }

  public mapFrom(data: CongresspersonDTO): Congressperson { 
    let congressperson = new Congressperson()
    congressperson.id = data.id
    congressperson.name = data.name
    congressperson.state = data.state
    congressperson.partyId = data.partyId
    if(data.party)
      data.party = this.partyMapper.mapFrom(data.party)
    return congressperson  
  }

  public mapTo(data: Congressperson): CongresspersonDTO { 
    return new CongresspersonDTO(data.id, data.name, data.state, data.partyId, data.party)
  }
}

@Injectable()
export class CongresspeopleMapper extends Mapper<CongresspersonDTO[], Congressperson[]>{
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