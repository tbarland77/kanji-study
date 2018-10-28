import { Kanji } from './models/kanji';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private kanjiCollection: AngularFirestoreCollection<Kanji>;
  kanji: Observable<Kanji[]>;
  constructor(private afs: AngularFirestore) {
    this.kanjiCollection = afs.collection<Kanji>('kanji');
    this.kanji = this.kanjiCollection.valueChanges();
  }
  title = 'kanji-study';
}
