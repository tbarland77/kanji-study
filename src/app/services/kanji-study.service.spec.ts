import { TestBed } from '@angular/core/testing';

import { KanjiStudyService } from './kanji-study.service';
import { AngularFirestore } from '@angular/fire/firestore';

describe('KanjiStudyService', () => {
  const AngularFirestoreStub = {

    collection: (someString) => {
       // stub
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [
      {provide: AngularFirestore, useValue: AngularFirestoreStub}
    ],
    });
  });

  it('should be created', () => {
    const service: KanjiStudyService = TestBed.get(KanjiStudyService);
    expect(service).toBeTruthy();
  });
});
