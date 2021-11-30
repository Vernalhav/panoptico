import { Vote } from ".";

export class Subject { 
  constructor(
    public subjectId: number,
    public subjectName: string,
    public votes: Vote[] = []
  ) {}
}

export class MonitoredSubjects{
  constructor( 
    public subjects: Subject[]
  ) {}
}
