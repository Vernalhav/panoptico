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

    this.range.get('start')?.valueChanges.subscribe(value=>{
      if(this.validateDates()){
        this.controller.setStart(value);
      }
    })

    this.range.get('end')?.valueChanges.subscribe(value=>{
      if(this.validateDates()){
        this.controller.setEnd(value);
      }
    })
  }

  validateDates() {
    const { start, end } = this.range.value;
    return !start || !end || start <= end;
  }

}
