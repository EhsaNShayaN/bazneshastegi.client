import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Warranty } from './warranty';

describe('Warranty', () => {
  let component: Warranty;
  let fixture: ComponentFixture<Warranty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Warranty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Warranty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
