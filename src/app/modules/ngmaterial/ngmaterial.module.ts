import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatCardModule],
  exports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatCardModule]
})
export class MaterialAppModule { }
