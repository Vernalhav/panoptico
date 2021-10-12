import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PartyEntity from './entities/party.entity';

@Injectable()
export class PartyService {

  constructor(
    @InjectRepository(PartyEntity)
    private partiesRepository: Repository<PartyEntity>
  ) {}

  async getAll(): Promise<PartyEntity[]> {
    const result = await this.partiesRepository.find();
    console.log(result);
    return result;
  }
}