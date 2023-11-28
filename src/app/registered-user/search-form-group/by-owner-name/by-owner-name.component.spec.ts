import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByOwnerNameComponent } from './by-owner-name.component';

describe('ByOwnerNameComponent', () => {
  let component: ByOwnerNameComponent;
  let fixture: ComponentFixture<ByOwnerNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByOwnerNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByOwnerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
