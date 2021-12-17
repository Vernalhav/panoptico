import { Component, Input } from '@angular/core';


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


  private interpolate = (start: number, end: number, p: number):number => {
    return (1.0-p)*start + p*end;
  }

  handlerFillColor = (word: any, index: number) => {
    
    const p = (word.value - this.fixedIncrementValue)/this.baseTextSize;
    const cold = [64, 196, 255]; 
    const hot  = [230, 81, 0];

    const r = Math.floor(this.interpolate(cold[0], hot[0], p));
    const g = Math.floor(this.interpolate(cold[1], hot[1], p));
    const b = Math.floor(this.interpolate(cold[2], hot[2], p));
    
    return `rgb(${r},${g},${b})`;
  }
  
  handleRotate = (word: any, index: number) => 0
}
