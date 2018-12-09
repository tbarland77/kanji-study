import { Observable, of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViewComponent } from './card-view.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KanjiStudyService } from 'src/app/services/kanji-study.service';

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
      declarations: [ CardViewComponent ],
      providers: [
        { provide: ActivatedRoute,  useValue: {params: of({id: 1})} },
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

  });
});
