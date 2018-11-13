import { AuthService } from '../../services/auth.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { User } from 'firebase';
import { Router } from '@angular/router';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authState: any;
  class MockAuthService {
    user: Observable<User>;
    signup() {
      // stub
    }
    login() {
      // stub
    }

    logout() {
      // stub
    }
  }

  class MockRouter {
    navigate() {
      // stub
    }
  }

  beforeEach(async(() => {
    authState = {
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
      },
      authState: of(authState),
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AngularFireAuth, useValue: afAuthStub },
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signup', () => {
    spyOn(component.authService, 'signup');
    component.signup();
    expect(component.authService.signup).toHaveBeenCalled();
  });

  it('should call login', () => {
    spyOn(component.authService, 'login');
    component.login();
    expect(component.authService.login).toHaveBeenCalled();
  });

  it('should call logout', () => {
    spyOn(component.authService, 'logout');
    component.logout();
    expect(component.authService.logout).toHaveBeenCalled();
  });

  describe('logged in template tests', () => {

    beforeEach(() => {
      component.authService.authState = authState;
      fixture.detectChanges();
    });

    it('should display a greeting when the user is logged in', () => {
      const greeting = fixture.debugElement.query(By.css('#greeting-msg'));
      expect(greeting.nativeElement).toBeTruthy();
    });

    it('should display the logout button when the user is logged in', () => {
      const logoutBtn = fixture.debugElement.query(By.css('.fill-column'));
      expect(logoutBtn.nativeElement).toBeTruthy();
    });

    it('should call logout when the user has entered an email and password', () => {
      console.log(JSON.stringify(authState));
      spyOn(component, 'logout');
      component.email = 'test@test.com';
      component.password = 'the things';
      fixture.detectChanges();
      const signInBtn = fixture.debugElement.query(By.css('.log-out-btn'));
      signInBtn.nativeElement.click();
      expect(component.logout).toHaveBeenCalled();
    });
  });

  describe('anonymous user template tests', () => {

    beforeEach(() => {
      component.authService.authState = null;
      fixture.detectChanges();
    });

    it('should display the material card component for login', () => {
      const matCard = fixture.debugElement.query(By.css('.page'));
      expect(matCard.nativeElement).toBeTruthy();
    });

    it('should call signup when the user has entered an email and password', () => {
      spyOn(component, 'signup');
      component.email = 'test@test.com';
      component.password = 'the things';
      fixture.detectChanges();
      const signInBtn = fixture.debugElement.query(By.css('.sign-up-btn'));
      signInBtn.nativeElement.click();
      expect(component.signup).toHaveBeenCalled();
    });

    it('should call login when the user has entered an email and password', () => {
      spyOn(component, 'login');
      component.email = 'test@test.com';
      component.password = 'the things';
      fixture.detectChanges();
      const signInBtn = fixture.debugElement.query(By.css('.log-in-btn'));
      signInBtn.nativeElement.click();
      expect(component.login).toHaveBeenCalled();
    });
  });
});
