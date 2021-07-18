/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SellerContactComponent } from './seller-contact.component';

describe('SellerContactComponent', () => {
  let component: SellerContactComponent;
  let fixture: ComponentFixture<SellerContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
