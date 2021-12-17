type LawCount = {
  subject: string;
  count: number;
}

export class PartyLawCounts {
  constructor(
    public partyName: string,
    public partyAcronym: string,
    public lawCounts: LawCount[] = [],
  ) {}
}

export class CongresspersonLawCounts {
  constructor(
    public congresspersonName: string,
    public lawCounts: LawCount[] = [],
  ) {}
}

export class LawCounts {
  constructor(
    public congresspeopleLawCounts: CongresspersonLawCounts[] = [],
    public partiesLawCounts: PartyLawCounts[] = [],
  ) {}
}