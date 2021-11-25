import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MonitoredIntervalController } from 'src/core/controller/monitored-interval.controller';
import { MonitoredIntervalView } from 'src/core/view/monitored-interval.view';

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
  }

  validateDates() {
    const { start, end } = this.range.value;
    return !start || !end || start <= end;
  }

  handleChange() {
    if (this.validateDates()) {
      this.controller.setStart(this.range.value.start);
      this.controller.setEnd(this.range.value.end);
    }
  }
}
