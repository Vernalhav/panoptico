import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MonitoredIntervalModel } from 'src/core/model/monitored-interval.model';

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

  constructor(readonly model: MonitoredIntervalModel) {
    this.range.patchValue({
      start: model.start,
      end: model.end,
    });
  }

  validateDates() {
    const { start, end } = this.range.value;
    return !start || !end || start <= end;
  }

  handleChange() {
    this.model.start = this.range.value.start || this.model.start;
    this.model.end = this.range.value.end || this.model.end;
  }
}
