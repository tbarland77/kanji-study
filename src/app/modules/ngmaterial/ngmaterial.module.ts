import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatCardModule, MatGridListModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatCardModule, MatGridListModule],
  exports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatCardModule, MatGridListModule]
})
export class MaterialAppModule { }
