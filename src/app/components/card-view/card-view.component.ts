import { StudyLevel } from './../../enums/study-level.enum';
import { KanjiStudyService } from './../../services/kanji-study.service';
import { Component, OnInit } from '@angular/core';
import { Kanji } from 'src/app/models/kanji';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.sass']
})
export class CardViewComponent implements OnInit {
  studyLevel: string;
  studyList: Kanji[];
  currentCards: Kanji[];
  answer: Kanji;
  answerIndex: number;
  score = 0;

  constructor(private kanjiStudyService: KanjiStudyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studyLevel = params.id;
    });
    this.kanjiStudyService.getKanji().subscribe((kanjis: Kanji[]) => {
        this.studyList = kanjis.filter(kanji => kanji.category.toUpperCase() === this.studyLevel.toUpperCase());
        console.dir(this.studyList);
        this.shuffleCards();
        console.dir(this.answerIndex);
        console.dir(this.currentCards);
    });
  }

  shuffleCards() {
    this.studyList.sort( () =>  0.5 - Math.random());
    this.currentCards = this.studyList.slice(0, 4);
    this.chooseAnswer();
  }

  chooseAnswer() {
    this.answer = this.currentCards[Math.floor(Math.random() * this.currentCards.length)];
    this.answerIndex = this.currentCards.findIndex(x => x.character === this.answer.character);
    this.answer = this.studyList[this.answerIndex];
  }

  compareUserSelectedAnswer(selectedCard: Kanji) {
    if (selectedCard.character === this.answer.character) {
      this.score ++;
    }
    this.shuffleCards();
  }

}
