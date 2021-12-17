import { Component, Input } from '@angular/core';

type Color = [number, number, number];

@Component({
  selector: 'app-binary-word-cloud',
  templateUrl: './binary-word-cloud.component.html',
  styleUrls: ['./binary-word-cloud.component.scss']
})
export class BinaryWordCloudComponent  {

  cloudData: {text: string, value: number, hotColor: boolean}[] = []

  @Input() width: number = 600

  @Input() height: number = 600

  @Input() fixedMaxValue: number | undefined = undefined 

  @Input() fixedIncrementValue: number = 0

  @Input() baseTextSize: number = 40
  
  @Input() set data (val: {text: string, value: number, hotColor: boolean}[]){
    // If has a fixed max value use it, else get the max value from array of values
    const maxValue = this.fixedMaxValue || val.reduce((max, i) => i.value > max ? i.value : max , 1);
   
    this.cloudData = val.map((i) => { 
      return { 
        text: i.text, 
        hotColor: i.hotColor,
        value: Math.floor((i.value/maxValue) * this.baseTextSize) + this.fixedIncrementValue
      } 
    });

    // this.cloudData.push({text: "Sim", value:  this.baseTextSize+this.fixedIncrementValue, hotColor: true });
    // this.cloudData.push({text: "Não", value:  this.baseTextSize+this.fixedIncrementValue, hotColor: false });
  }

  private interpolateColor = (start: Color, end: Color, p: number): Color => {
    return [(1.0-p)*start[0] + p*end[0], (1.0-p)*start[1] + p*end[1], (1.0-p)*start[2] + p*end[2]];
  }

  handlerFillColor = (word: any, index: number) => {
    
    // console.log(`Has hotColor: ${word.text} ${word.value} ${word.hotColor}`)

    const p = (word.value - this.fixedIncrementValue)/this.baseTextSize;
    const reallyCold: Color = [0, 230, 118];
    const kindaCold: Color = [185, 246, 202]; // [1, 87, 155];
        
    const reallyHot: Color  = [255, 23, 68];
    const kindaHot: Color  = [255, 138, 128];

    let [r, g, b] = this.interpolateColor(kindaCold, reallyCold, p);
    
    if (word.hotColor)
      [r, g, b] = this.interpolateColor(kindaHot, reallyHot, p);
    
    return `rgb(${r},${g},${b})`;
  }
  
  handleRotate = (word: any, index: number) => 0
}
