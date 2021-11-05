import { Component, Input } from '@angular/core';
import { Voting } from 'src/core/model/entities/voting.entity';

@Component({
  selector: 'app-voting-card',
  templateUrl: './voting-card.component.html',
  styleUrls: ['./voting-card.component.scss'],
})
export class VotingCardComponent {
  @Input() voting!: Voting;
}
