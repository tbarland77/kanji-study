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
    navigateByUrl(url: string) {
      return url;
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

  describe('component creation', () => {
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  });

  describe('calls made to the auth service', () => {
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

  it('should call router navigate by url', () => {
    spyOn(component.router, 'navigateByUrl');
    component.goToMainMenu();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/menu');
  });
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

    it('should display the menu button when the user is logged in', () => {
      const menuBtn = fixture.debugElement.query(By.css('.main-menu-btn'));
      expect(menuBtn.nativeElement).toBeTruthy();
    });

    it('should display the menu button when the user is logged in', () => {
      const menuBtn = fixture.debugElement.query(By.css('.main-menu-btn'));
      expect(menuBtn.nativeElement).toBeTruthy();
    });

    it('should call go to main menu on click', () => {
      spyOn(component, 'goToMainMenu');
      fixture.detectChanges();
      const menuBtn = fixture.debugElement.query(By.css('.main-menu-btn'));
      menuBtn.nativeElement.click();
      expect(component.goToMainMenu).toHaveBeenCalled();
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

    it('should disable the sign up button if email is null', () => {
      spyOn(component, 'signup');
      component.email = null;
      fixture.detectChanges();
      const signInBtn = fixture.debugElement.query(By.css('.sign-up-btn'));
      signInBtn.nativeElement.click();
      expect(component.signup).not.toHaveBeenCalled();
    });

    it('should disable the sign up button if password is null', () => {
      spyOn(component, 'signup');
      component.password = null;
      fixture.detectChanges();
      const signInBtn = fixture.debugElement.query(By.css('.sign-up-btn'));
      signInBtn.nativeElement.click();
      expect(component.signup).not.toHaveBeenCalled();
    });

    it('should disable the sign up button if email and password are both null', () => {
      spyOn(component, 'signup');
      component.password = null;
      fixture.detectChanges();
      const signInBtn = fixture.debugElement.query(By.css('.sign-up-btn'));
      signInBtn.nativeElement.click();
      expect(component.signup).not.toHaveBeenCalled();
    });

    it('should disable the login button if email is null', () => {
      spyOn(component, 'login');
      component.email = null;
      fixture.detectChanges();
      const logInBtn = fixture.debugElement.query(By.css('.log-in-btn'));
      logInBtn.nativeElement.click();
      expect(component.login).not.toHaveBeenCalled();
    });

    it('should disable the login button if password is null', () => {
      spyOn(component, 'login');
      component.password = null;
      fixture.detectChanges();
      const logInBtn = fixture.debugElement.query(By.css('.log-in-btn'));
      logInBtn.nativeElement.click();
      expect(component.login).not.toHaveBeenCalled();
    });

    it('should disable the login button if email and password are null', () => {
      spyOn(component, 'login');
      component.password = null;
      fixture.detectChanges();
      const logInBtn = fixture.debugElement.query(By.css('.log-in-btn'));
      logInBtn.nativeElement.click();
      expect(component.login).not.toHaveBeenCalled();
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
