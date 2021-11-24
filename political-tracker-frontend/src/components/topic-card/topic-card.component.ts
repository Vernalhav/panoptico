import { Component, Input } from '@angular/core';
import { VotingBySubject } from 'src/core/model/entities/voting-by-subject.entity';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss']
})
export class TopicCardComponent {
  @Input() voting!: VotingBySubject;
}
