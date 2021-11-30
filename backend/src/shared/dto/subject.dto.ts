import { VoteDTO } from ".";

export class SubjectDTO { 
  constructor(
    public subjectId: number,
    public subjectName: string,
    public votes: VoteDTO[]
  ) {}
}

export class SubjectsMonitorResponseDTO{
  constructor( 
    public subjects: SubjectDTO[]
  ) {}
}
