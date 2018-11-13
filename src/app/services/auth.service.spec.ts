import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import * as firebase from 'firebase';

describe('AuthService', () => {
  class MockRouter {
    navigate() {
      // stub
    }
  }
  let service: AuthService;
  const authState: any = {
    displayName: null,
    isAnonymous: true,
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
  };
  const afAuthStub = {
    auth: {
      createUserWithEmailAndPassword(): Promise<void> {
        return new Promise<void>(resolve => resolve());
      },
      signInWithEmailAndPassword(): Promise<void> {
        return new Promise<void>(resolve => resolve());
      },
      signOut(): Promise<void> {
        return new Promise<void>(resolve => resolve());
      },
      sendPasswordResetEmail(): Promise<void> {
        return new Promise<void>(resolve => resolve());
      },
    },
    authState: of(authState),
  };

  beforeEach(() => {
    const response = [];
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: afAuthStub },
        { provide: Router, useClass: MockRouter },
      ]
    });
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call create user with email and password on sign up', () => {
    const mock = TestBed.get(AngularFireAuth);
    spyOn(afAuthStub.auth, 'createUserWithEmailAndPassword');
    mock.auth = afAuthStub.auth;
    service.signup('bob', 'bob@bob.com');
    expect(afAuthStub.auth.createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it('should call log in with email and password on log in', () => {
    const mock = TestBed.get(AngularFireAuth);
    spyOn(afAuthStub.auth, 'signInWithEmailAndPassword');
    mock.auth = afAuthStub.auth;
    service.login('bob', 'bob@bob.com');
    expect(afAuthStub.auth.signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('should call reset password', () => {
    const mock = TestBed.get(AngularFireAuth);
    spyOn(afAuthStub.auth, 'signOut');
    mock.auth = afAuthStub.auth;
    service.logout();
    expect(afAuthStub.auth.signOut).toHaveBeenCalled();
  });

  it('should call log out on user log out ', () => {
    const mock = TestBed.get(AngularFireAuth);
    spyOn(afAuthStub.auth, 'sendPasswordResetEmail');
    mock.auth = afAuthStub.auth;
    service.resetPassword('bob@bob.com');
    expect(afAuthStub.auth.sendPasswordResetEmail).toHaveBeenCalled();
  });
});
