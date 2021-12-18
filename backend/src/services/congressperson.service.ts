import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Congressperson } from 'src/entities';
import { Repository } from 'typeorm';

export class InvalidCongresspersonError extends Error {}

@Injectable()
export class CongresspersonService {
  constructor(
    @InjectRepository(Congressperson)
    private partiesRepository: Repository<Congressperson>,
  ) {}

  async getAll(): Promise<Congressperson[]> {
    return await this.partiesRepository.find();
  }
}
