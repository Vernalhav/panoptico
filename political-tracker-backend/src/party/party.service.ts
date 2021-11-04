import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PartyEntity from './entities/party.entity';

@Injectable()
export class PartyService {
  constructor(
    @InjectRepository(PartyEntity)
    private partiesRepository: Repository<PartyEntity>,
  ) {}

  async getAll(): Promise<PartyEntity[]> {
    const result = await this.partiesRepository.find();
    return result;
  }

  async getAllWithMembers(): Promise<PartyEntity[]> {
    let result = await this.partiesRepository.find({ relations: ['members'] });
    return result.filter((party) => party.members.length > 0);
  }
}
