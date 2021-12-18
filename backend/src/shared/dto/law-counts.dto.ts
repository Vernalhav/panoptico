type LawCount = {
  subject: string;
  count: number;
}

export class PartyLawCountsDTO {
  constructor(
    public partyName: string,
    public partyAcronym: string,
    public lawCounts: LawCount[] = [],
  ) {}
}

export class CongresspersonLawCountsDTO {
  constructor(
    public congresspersonName: string,
    public lawCounts: LawCount[] = [],
  ) {}
}

export class LawCountsDTO {
  constructor(
    public congresspeopleLawCounts: CongresspersonLawCountsDTO[] = [],
    public partiesLawCounts: PartyLawCountsDTO[] = [],
  ) {}
}