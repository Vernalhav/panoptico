import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MonitoredIntervalController } from 'src/app/core/controllers';
import { MonitoredIntervalView } from 'src/app/core/views';

@Component({
  selector: 'app-monitored-dates',
  templateUrl: './monitored-dates.component.html',
  styleUrls: ['./monitored-dates.component.scss'],
})
export class MonitoredDatesComponent {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    readonly view: MonitoredIntervalView,
    readonly controller: MonitoredIntervalController,
  ) {

    this.range.patchValue({
      start: view.start,
      end: view.end,
    });
    
    this.range.valueChanges.subscribe(value => {
      const { start, end } = value as { start: Date, end: Date };
      if (!this.validRange(start, end)) return;

      this.controller.setStart(start);
      this.controller.setEnd(end);
    })
  }

  validRange(start: Date | null, end: Date | null) {
    return !!start && !!end && start <= end;
  }
}
