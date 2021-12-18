import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Vote, VoteByParty } from "src/entities";
import { VotingDTO } from "src/shared/dto";
import { Between, In, Repository } from "typeorm";

@Injectable()
export class VotingsMonitorService {
  
  constructor(
    @InjectRepository(Vote)
    private votesRepository: Repository<Vote>,
    @InjectRepository(VoteByParty)
    private votesByPartyRepository: Repository<VoteByParty>,
  ) {}

  async getVotingsByParties(
    partiesIds: number[],
    startDate: string, 
    endDate: string
  ): Promise<Map<string,VotingDTO>> {
    
    const partiesVotes: VoteByParty[] = await this.votesByPartyRepository.find({
      relations: ['party', 'voting'],
      where: {
        partyId: In(partiesIds),
        voting: { date: Between(startDate, endDate) }
      }
    })

    const groupByVoting = partiesVotes.reduce((votings: Map<string,VotingDTO>, vote: VoteByParty) => {
      if(votings[vote.votingId] === undefined){
        votings[vote.votingId] = { votingId: vote.votingId, votingDate: vote.voting.date, votes: [] };
      }

      votings[vote.votingId].votes.push({
        entity: 'party',
        entityId: vote.partyId,
        entityName: vote.party.acronym,
        yes: vote.yes,
        no: vote.no,
        other: vote.other,
      });

      return votings;
    }, new Map<string,VotingDTO>())

    return groupByVoting;
  }

  async getVotingsByCongresspeople(
    congresspersonIds: number[],
    startDate: string, 
    endDate: string
  ): Promise<Map<string,VotingDTO>> {
    
    const congressVotes = await this.votesRepository.find({
      relations: ['congressperson', 'voting'],
      where: [
        { 
          congresspersonId: In(congresspersonIds),
          voting: { date: Between(startDate, endDate) } 
        },
      ]
    });

    const groupByVoting = congressVotes.reduce((votings: Map<string,VotingDTO>, vote: Vote) => {
      if(votings[vote.votingId] === undefined){
        votings[vote.votingId] = new VotingDTO(vote.votingId, vote.voting.date, [])
      }

      votings[vote.votingId].votes.push({
        entity: 'congressperson',
        entityId: vote.congresspersonId,
        entityName: vote.congressperson.name,
        yes: vote.yes,
        no: vote.no,
        other: vote.other,
      });

      return votings;
    }, new Map<string,VotingDTO>());

    return groupByVoting;
  }

  async getVotingsByEntities(
    congresspersonIds: number[],
    partiesIds: number[],
    startDate: string, 
    endDate: string
  ): Promise<Map<string,VotingDTO>> {
    
    let partiesVotings: Map<string,VotingDTO> = await this.getVotingsByParties(partiesIds, startDate, endDate);
    let congressVotings: Map<string,VotingDTO> = await this.getVotingsByCongresspeople(congresspersonIds, startDate, endDate);
    
    // Merge results into congressVotings
    Object.keys(partiesVotings).forEach((key) => { 
      if(congressVotings[key] === undefined){
        congressVotings[key] = partiesVotings[key]
      } else {
        console.log(congressVotings[key].votes)
        congressVotings[key].votes = congressVotings[key].votes.concat(partiesVotings[key].votes)
      }
    })
    
    return congressVotings;
  }
}
