import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByRegistrationYearComponent } from './by-registration-year.component';

describe('ByRegistrationYearComponent', () => {
  let component: ByRegistrationYearComponent;
  let fixture: ComponentFixture<ByRegistrationYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByRegistrationYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByRegistrationYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
