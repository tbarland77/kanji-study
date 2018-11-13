import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  const AngularFirestoreStub = {

    collection: (someString) => {
       // stub
    }
};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFirestoreModule
      ],
      providers: [{provide: AngularFirestore, useValue: AngularFirestoreStub}],
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'kanji-study'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('kanji-study');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to kanji-study!');
  // });
});
