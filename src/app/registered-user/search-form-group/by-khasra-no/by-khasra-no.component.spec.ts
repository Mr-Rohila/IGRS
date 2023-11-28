import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByKhasraNoComponent } from './by-khasra-no.component';

describe('ByKhasraNoComponent', () => {
  let component: ByKhasraNoComponent;
  let fixture: ComponentFixture<ByKhasraNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByKhasraNoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByKhasraNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
