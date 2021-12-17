import { Component, Input } from '@angular/core';

type Color = [number, number, number];

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent {

  cloudData: {text: string, value: number}[] = []

  @Input() width: number = 600

  @Input() height: number = 600

  @Input() fixedMaxValue: number | undefined = undefined 

  @Input() fixedIncrementValue: number = 0

  @Input() baseTextSize: number = 40
  
  @Input() set data (val: {text: string, value: number}[]){
    // If has a fixed max value use it, else get the max value from array of values
    const maxValue = this.fixedMaxValue || val.reduce((max, i) => i.value > max ? i.value : max , 1)
   
    this.cloudData = val.map((i) => { 
      return { 
        text: i.text, 
        value: Math.floor((i.value/maxValue) * this.baseTextSize) + this.fixedIncrementValue
      } 
    })
  }

  private interpolateColor = (start: Color, end: Color, p: number): Color => {
    return [(1.0-p)*start[0] + p*end[0], (1.0-p)*start[1] + p*end[1], (1.0-p)*start[2] + p*end[2]];
  }

  handlerFillColor = (word: any, index: number) => {
    
    const p = (word.value - this.fixedIncrementValue)/this.baseTextSize;
    const reallyCold: Color = [64, 196, 255];
    const kindaCold: Color = [1, 87, 155];
    const reallyHot: Color  = [230, 81, 0];
    const kindaHot: Color  = [255, 204, 128];

    let [r, g, b] = this.interpolateColor(kindaCold, reallyCold, 2 * p);
    if (p >= 0.5)
      [r, g, b] = this.interpolateColor(kindaHot, reallyHot, 2 * p - 1);
    
    return `rgb(${r},${g},${b})`;
  }
  
  handleRotate = (word: any, index: number) => 0
}
