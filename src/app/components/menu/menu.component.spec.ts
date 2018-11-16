import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  class MockRouter {
    navigate(url: string) {
      return url;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [
        { provide: Router, useClass: MockRouter },
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the study route', () => {
    spyOn(component.router, 'navigate');
    component.navigateToStudy(5);
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should call navigate to study with a value of 1 ', () => {
    spyOn(component, 'navigateToStudy');
    const N5Btn = fixture.debugElement.query(By.css('.n5-btn'));
    N5Btn.nativeElement.click();
    expect(component.navigateToStudy).toHaveBeenCalledWith(1);
  });

  it('should call navigate to study with a value of 2 ', () => {
    spyOn(component, 'navigateToStudy');
    const N4Btn = fixture.debugElement.query(By.css('.n4-btn'));
    N4Btn.nativeElement.click();
    expect(component.navigateToStudy).toHaveBeenCalledWith(2);
  });

  it('should call navigate to study with a value of 3 ', () => {
    spyOn(component, 'navigateToStudy');
    const N3Btn = fixture.debugElement.query(By.css('.n3-btn'));
    N3Btn.nativeElement.click();
    expect(component.navigateToStudy).toHaveBeenCalledWith(3);
  });

  it('should call navigate to study with a value of 4 ', () => {
    spyOn(component, 'navigateToStudy');
    const N2Btn = fixture.debugElement.query(By.css('.n2-btn'));
    N2Btn.nativeElement.click();
    expect(component.navigateToStudy).toHaveBeenCalledWith(4);
  });

  it('should call navigate to study with a value of 5 ', () => {
    spyOn(component, 'navigateToStudy');
    const N1Btn = fixture.debugElement.query(By.css('.n1-btn'));
    N1Btn.nativeElement.click();
    expect(component.navigateToStudy).toHaveBeenCalledWith(5);
  });
});
