import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularD3CloudModule } from './word-cloud/public-api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularD3CloudModule,
  ],
  exports: [
    AngularD3CloudModule,
  ]
})
export class ExternalModule { }
