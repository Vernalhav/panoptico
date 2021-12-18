import { Component, Input, OnInit } from '@angular/core';
import { CamaraService } from 'src/app/core/services/camara/camara.service';
import { VotingDetailsResponse } from 'src/app/core/services/camara/camara.types';

@Component({
  selector: 'app-voting-details',
  templateUrl: './voting-details.component.html',
  styleUrls: ['./voting-details.component.scss'],
})
export class VotingDetailsComponent {
  @Input() votingId!: string;
  loading = false;
  details?: VotingDetailsResponse;

  constructor(private readonly svc: CamaraService) {}

  load() {
    this.loading = true;
    this.svc.getVotingDetails(this.votingId).subscribe((details) => {
      this.details = details;
      this.loading = false;
    });
  }

  lazyLoadData() {
    if (this.details || this.loading) return;
    this.load(); 
  }
}
