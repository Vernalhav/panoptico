import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CongresspersonEntity from './entities/congressperson.entity';

@Injectable()
export class CongresspersonService {
  constructor(
    @InjectRepository(CongresspersonEntity)
    private congresspeopleRepository: Repository<CongresspersonEntity>,
  ) {}

  async getAll(): Promise<CongresspersonEntity[]> {
    const result = await this.congresspeopleRepository.find();
    console.log(result);
    return result;
  }
}
