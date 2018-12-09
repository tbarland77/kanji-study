import { Component, OnInit } from '@angular/core';
import { StudyLevel } from 'src/app/enums/study-level.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  studyLevels = StudyLevel;

  constructor(public router: Router) { }

  ngOnInit() {

  }

  navigateToStudy(studyLevel: number) {
    console.log(studyLevel);
    for (const studyItem in this.studyLevels) {
      if (studyLevel === Number(studyItem)) {
        this.router.navigate(['/study', StudyLevel[studyLevel]]);
      }
    }
  }

}
