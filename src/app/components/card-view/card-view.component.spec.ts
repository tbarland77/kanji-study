import { Observable, of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewComponent } from './card-view.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KanjiStudyService } from 'src/app/services/kanji-study.service';
import { By } from '@angular/platform-browser';

describe('CardViewComponent', () => {
  let component: CardViewComponent;
  let fixture: ComponentFixture<CardViewComponent>;
  const mockKanjiResponse = [

    {
      'category': 'jlptn5',
      'character': '分',
      'kunyomi': ' わ.ける、 わ.け、 わ.かれる、 わ.かる、 わ.かつ',
      'meaning': 'day, sun, Japan',
      'onyomi': 'ブン フン ブ'
    },
    {
      'category': 'jlptn5',
      'character': '八',
      'kunyomi': 'や や.つ やっ.つ',
      'meaning': 'eight',
      'onyomi': 'ハチ ヨ'
    },
    {
      'category': 'jlptn5',
      'character': '気',
      'kunyomi': 'いき',
      'meaning': 'spirit, mind',
      'onyomi': 'キ ケ'
    },
    {
      'category': 'jlptn5',
      'character': '子',
      'kunyomi': 'こ -こ',
      'meaning': 'child, sign of the rat, 11PM-1AM, first sign of Chinese zodiac',
      'onyomi': 'シ ス ツ'
    }
  ];

  class MockKanjiStudyService {
    getKanji() {
      return of(mockKanjiResponse);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardViewComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 'JLPTN5' }) } },
        { provide: KanjiStudyService, useClass: MockKanjiStudyService },
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the study level', () => {
      component.ngOnInit();
      expect(component.studyLevel).toBe('JLPTN5');
    });
    it('should initialize the study list', () => {
      component.ngOnInit();
      expect(component.studyList.length).toBe(4);
    });
    it('should call shuffle cards', () => {
      spyOn(component, 'shuffleCards');
      component.ngOnInit();
      expect(component.shuffleCards).toHaveBeenCalled();
    });
  });

  describe('shuffle cards', () => {
    it('should call sort on the study list', () => {
      spyOn(component.studyList, 'sort');
      component.shuffleCards();
      expect(component.studyList.sort).toHaveBeenCalled();
    });
    it('should set the current cards', () => {
      component.shuffleCards();
      expect(component.currentCards.length).toBe(4);
    });
    it('should call choose answer', () => {
      spyOn(component, 'chooseAnswer');
      component.shuffleCards();
      expect(component.chooseAnswer).toHaveBeenCalled();
    });
  });

  describe('choose answer', () => {
    it('should set the answer', () => {
      component.currentCards = mockKanjiResponse;
      component.chooseAnswer();
      expect(component.currentCards).toContain(component.answer);
    });
    it('should set the answer index', () => {
      component.currentCards = mockKanjiResponse;
      component.chooseAnswer();
      expect(component.answerIndex).not.toBeNull();
    });
  });

  describe('compare user selected answer', () => {
    it('should increase the score given the answer was correct', () => {
      component.answer = mockKanjiResponse[1];
      component.compareUserSelectedAnswer(mockKanjiResponse[1]);
      expect(component.score).toBe(1);
    });
    it('should not increase the score given the answer was incorrect', () => {
      component.answer = mockKanjiResponse[1];
      component.compareUserSelectedAnswer(mockKanjiResponse[3]);
      expect(component.score).toBe(0);
    });
    it('should call shuffle cards to begin the next question', () => {
      spyOn(component, 'shuffleCards');
      component.answer = mockKanjiResponse[1];
      component.compareUserSelectedAnswer(mockKanjiResponse[3]);
      expect(component.shuffleCards).toHaveBeenCalled();
    });
  });

  describe('card view template tests', () => {
    beforeEach(() => {
      component.studyList = mockKanjiResponse;
      component.answerIndex = 1;
      fixture.detectChanges();
    });
    it('should display the character answer', () => {
      const answerText = fixture.debugElement.query(By.css('.answer-character'));
      expect(answerText.nativeElement.innerHTML)
        .toBe(` Character: ${component.studyList[component.answerIndex].character} `);
    });
    it('should display the kunyomi for the current card', () => {
      const answerText = fixture.debugElement.queryAll(By.css('.kunyomi'));
      answerText.forEach((text, index) => {
        expect(text.nativeElement.innerHTML).toBe(`訓読み: ${component.studyList[index].kunyomi}`);
      });
    });
    it('should display the onyomi for the current card', () => {
      const answerText = fixture.debugElement.queryAll(By.css('.onyomi'));
      answerText.forEach((text, index) => {
        expect(text.nativeElement.innerHTML).toBe(`音読み: ${component.studyList[index].onyomi}`);
      });
    });
    it('should display the english meaning for the current card', () => {
      const answerText = fixture.debugElement.queryAll(By.css('.meaning'));
      answerText.forEach((text, index) => {
        expect(text.nativeElement.innerHTML).toBe(`意味(英語): ${component.studyList[index].meaning}`);
      });
    });
  });
});
