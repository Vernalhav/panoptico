import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LawCountByAuthor, LawCountByParty } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class LawCountMonitorService {
  constructor(
    @InjectRepository(LawCountByAuthor)
    private authorLawCountRepository: Repository<LawCountByAuthor>,
    @InjectRepository(LawCountByParty)
    private partyLawCountRepository: Repository<LawCountByParty>,
  ) {}

  async getPartyLawCounts(partyId: number) {
    const partyLawCounts = await this.partyLawCountRepository.find({
      relations: ['subject'],
      where: { partyId: partyId },
    });
    return partyLawCounts;
  }
}