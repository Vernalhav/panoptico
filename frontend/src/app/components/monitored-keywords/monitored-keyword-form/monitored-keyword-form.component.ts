import { Component } from '@angular/core';
import { MonitoredKeywordsController } from 'src/app/core/controllers';

@Component({
  selector: 'app-monitored-keyword-form',
  templateUrl: './monitored-keyword-form.component.html',
  styleUrls: ['./monitored-keyword-form.component.scss'],
})
export class MonitoredKeywordFormComponent {
  public word = '';
  public isRegex = false;
  public loading = false;

  constructor(readonly controller: MonitoredKeywordsController) {}

  handleClick() {
    if (this.word.length === 0) {
      return;
    }
    this.loading = true;
    this.controller
    .addKeyword(this.word, this.isRegex)
    .then(() => {
      this.word = '';
      this.isRegex = false;
    })
    .finally(() => { 
      this.loading = false;
    });
  }
}
