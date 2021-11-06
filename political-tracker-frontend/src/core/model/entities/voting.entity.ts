export class Voting {
  id: string;
  date: string;
  subject: string;
  total: number;
  yes: number;
  no: number;
  abstain: number;
  others: number;

  constructor(
    id: string,
    date: string,
    subject: string,
    total: number,
    yes: number,
    no: number,
    abstain: number,
    others: number,
  ) {
    this.id = id;
    this.date = date;
    this.subject = subject;
    this.total = total;
    this.yes = yes;
    this.no = no;
    this.abstain = abstain;
    this.others = others;
  }
}
