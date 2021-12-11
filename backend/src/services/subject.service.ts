import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private partiesRepository: Repository<Subject>,
  ) {}

  async getAll(): Promise<Subject[]> {
    return await this.partiesRepository.find();
  }

  async getFilteredByName(
    subjects: string[],
    regexSubjects: string[],
  ): Promise<Subject[]> {
    return (await this.getAll()).filter((sbj) =>
      regexSubjects.find((r) => {
        try {
          return (
            new RegExp(r).test(sbj.name) || subjects.find((s) => s === sbj.name)
          );
        } catch {
          return false;
        }
      }),
    );
  }
}
