import { Congressperson, Party, Subject, Voting } from "../../entities";

export interface IAPIVotingsRequest {
  partiesIds?: number[];
  congresspersonIds?: number[];
  subjects?: string[];
  regexSubjects?: string[];
  startDate?: string;
  endDate?: string;
}

export interface IAPIPartiesResponse {
  parties: Party[];
}

export interface IAPICongresspersonResponse {
  congresspeople: Congressperson[];
}

export interface IAPIMonitorVotingsResponse { 
  votings: Voting[];
}

export interface IAPIMonitorSubjectsResponse { 
  subjects: Subject[]
}