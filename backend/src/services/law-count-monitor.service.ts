import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LawCountByAuthor, LawCountByParty } from 'src/entities';
import { CongresspersonLawCountsDTO, LawCountsDTO, PartyLawCountsDTO } from 'src/shared/dto/law-counts.dto';
import { addAbortSignal } from 'stream';
import { Repository } from 'typeorm';
import { InvalidCongresspersonError, InvalidPartyIdError } from '.';

@Injectable()
export class LawCountMonitorService {
  constructor(
    @InjectRepository(LawCountByAuthor)
    private authorLawCountRepository: Repository<LawCountByAuthor>,
    @InjectRepository(LawCountByParty)
    private partyLawCountRepository: Repository<LawCountByParty>,
  ) {}

  async getLawCounts(congresspeopleIds: number[] = [], partyIds: number[] = []): Promise<LawCountsDTO> {
    const result = new LawCountsDTO;
    
    for (const partyId of partyIds) {
      try {
        result.partiesLawCounts.push(await this.getPartyLawCounts(partyId));
      } catch { continue; }
    }
    
    for (const congresspersonId of congresspeopleIds) {
      try{
        result.congresspeopleLawCounts.push(await this.getCongresspersonLawCounts(congresspersonId));
      } catch { continue; }
    }
    
    return result;
  }

  async getPartyLawCounts(partyId: number): Promise<PartyLawCountsDTO> {
    const partyLawCounts = await this.partyLawCountRepository.find({
      relations: ['subject', 'party'],
      where: { partyId: partyId },
    });

    if (partyLawCounts.length == 0)
      throw new InvalidPartyIdError(`Could not find party ID ${partyId}`);

    const partyName = partyLawCounts[0].party.name;
    const partyAcronym = partyLawCounts[0].party.acronym;

    // TODO: Create a proper Mapper
    const result = partyLawCounts.reduce<PartyLawCountsDTO>((acc, cur) => {
      acc.lawCounts.push({
        subject: cur.subject.name,
        count: cur.lawCount,
      });
      return acc;
    }, new PartyLawCountsDTO(partyName, partyAcronym));

    return result;
  }

  async getCongresspersonLawCounts(congresspersonId: number): Promise<CongresspersonLawCountsDTO> {
    const congresspersonLawCounts = await this.authorLawCountRepository.find({
      relations: ['subject', 'congressperson'],
      where: { congresspersonId: congresspersonId },
    });

    if (congresspersonLawCounts.length == 0)
      throw new InvalidCongresspersonError(`Could not find congressperson with ID ${congresspersonId}`);

    const congresspersonName = congresspersonLawCounts[0].congressperson.name;

    // TODO: Create a proper Mapper
    const result = congresspersonLawCounts.reduce<CongresspersonLawCountsDTO>((acc, cur) => {
      acc.lawCounts.push({
        subject: cur.subject.name,
        count: cur.lawCount,
      });
      return acc;
    }, new CongresspersonLawCountsDTO(congresspersonName));

    return result;
  }
}
