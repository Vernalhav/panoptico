export class VoteDTO {
  constructor(
    public entity: 'party' | 'congressperson',
    public entityId: number,
    public entityName: string,
    public yes: number | boolean,
    public no: number | boolean,
    public other: number | boolean,
  ) {}
}
