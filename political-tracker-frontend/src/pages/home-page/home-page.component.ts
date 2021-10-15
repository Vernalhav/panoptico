import { Component, OnInit } from '@angular/core';
import Party from 'src/app/core/interfaces/party.interface';
import { BackendService } from 'src/app/core/services/backend/backend.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  parties: Party[] = []

  constructor(private backendService: BackendService ) { }

  ngOnInit(): void {
    this.backendService.getParties()
      .subscribe((parties: Party[]) => { this.parties = parties });
  }
}
