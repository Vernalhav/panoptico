import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Party } from 'src/entities';

@Injectable()
export class PartyService {
  constructor(
    @InjectRepository(Party)
    private partiesRepository: Repository<Party>,
  ) {}

  async getAll(): Promise<Party[]> {
    return await this.partiesRepository.find();
  }

  async getAllWithMembers(): Promise<Party[]> {
    const parties = await this.partiesRepository.find({
      relations: ['members'],
    });
    return parties.filter((party) => party.members.length > 0);
  }
}
