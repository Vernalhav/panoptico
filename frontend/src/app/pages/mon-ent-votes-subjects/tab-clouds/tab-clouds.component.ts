import { Component, Input, OnDestroy, OnInit,} from '@angular/core';
import { Subject } from 'src/app/core/entities';

@Component({
  selector: 'app-tab-clouds',
  templateUrl: './tab-clouds.component.html',
  styleUrls: ['./tab-clouds.component.scss']
})
export class TabCloudsComponent {

  // General Subjects Wordcloud
  _yesSubjectsVotes: {text: string, value: number}[] = []
  _noSubjectsVotes: {text: string, value: number}[] = []
  _fixedMaxValue: number = 1  

  @Input() fixedIncrementValue: number = 0

  @Input() baseTextSize: number = 40
  
  @Input() set votingsFromSubjects(val: Subject[]) {
    this._yesSubjectsVotes = this.reduceVotingsToKeywordData(val, 'yes')
    this._noSubjectsVotes = this.reduceVotingsToKeywordData(val, 'no')
    
    // To preserve the size significance between the wordclouds compute a fixed max value
    this._fixedMaxValue = Math.max(
      1, 
      this._yesSubjectsVotes.reduce((max, i) => max > i.value ? max : i.value, 0),
      this._noSubjectsVotes.reduce((max, i) => max > i.value ? max : i.value, 0)
    )
  }

  reduceVotingsToKeywordData = (votings: Subject[], voteField: 'yes' | 'no' | 'other'): {text: string, value: number}[] => {
    let data: {text: string, value: number}[] = []

    for(let s of votings){
      data.push({
        text: s.subjectName,
        value: s.votes.reduce((acc, vote) => acc + Number(vote[voteField]), 0)
      })
    }
    
    return data;
  }
}
