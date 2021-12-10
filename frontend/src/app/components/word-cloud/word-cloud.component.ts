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
  
  @Input() set data (val: {text: string, value: number}[]){
    // If has a fixed max value use it, else get the max value from array of values
    const maxValue = this.fixedMaxValue || val.reduce((max, i) => i.value > max ? i.value : max , 1)
   
    this.cloudData = val.map((i) => { 
      return { 
        text: i.text, 
        value: Math.floor((i.value/maxValue) * 40)  
      } 
    })
  }



  handlerFillColor = (word: any, index: number) => '#ffffff'
  
  handleRotate = (word: any, index: number) => 0
}
