import { Component, Input, OnDestroy, OnInit,} from '@angular/core';
import { Subject } from 'src/app/core/entities';

@Component({
  selector: 'app-tab-clouds',
  templateUrl: './tab-clouds.component.html',
  styleUrls: ['./tab-clouds.component.scss']
})
export class TabCloudsComponent {

  // General Subjects Wordcloud
  _yesSubjectsVotes: {text: string, value: number, hotColor: boolean}[] = []
  _noSubjectsVotes: {text: string, value: number, hotColor: boolean}[] = []
  _fixedMaxValue: number = 1  

  @Input() fixedIncrementValue: number = 0

  @Input() baseTextSize: number = 40
  
  @Input() set votingsFromSubjects(val: Subject[]) {
    this._yesSubjectsVotes = this.reduceVotingsToKeywordData(val, 'yes', false)
    this._noSubjectsVotes = this.reduceVotingsToKeywordData(val, 'no', true)
    
    // To preserve the size significance between the wordclouds compute a fixed max value
    this._fixedMaxValue = Math.max(
      1, 
      this._yesSubjectsVotes.reduce((max, i) => max > i.value ? max : i.value, 0),
      this._noSubjectsVotes.reduce((max, i) => max > i.value ? max : i.value, 0)
    )
  }

  reduceVotingsToKeywordData = (votings: Subject[], voteField: 'yes' | 'no' | 'other', hotColor: boolean): {text: string, hotColor: boolean, value: number}[] => {
    let data: {text: string, value: number, hotColor: boolean}[] = []

    for(let s of votings){
      data.push({
        text: s.subjectName,
        hotColor: hotColor,
        value: s.votes.reduce((acc, vote) => acc + Number(vote[voteField]), 0)
      })
    }
    
    return data;
  }
}
