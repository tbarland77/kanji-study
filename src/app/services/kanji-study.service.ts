import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Kanji } from '../models/kanji';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KanjiStudyService {
  private kanjiCollection: AngularFirestoreCollection<Kanji>;
  kanji: Observable<Kanji[]>;

  constructor(private afs: AngularFirestore) {
   }
   getKanji(): Observable<Kanji[]> {
     this.kanjiCollection = this.afs.collection<Kanji>('kanji');
     return this.kanji = this.kanjiCollection.valueChanges();
   }
}
