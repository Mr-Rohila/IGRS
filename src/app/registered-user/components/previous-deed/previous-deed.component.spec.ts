import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousDeedComponent } from './previous-deed.component';

describe('PreviousDeedComponent', () => {
  let component: PreviousDeedComponent;
  let fixture: ComponentFixture<PreviousDeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousDeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousDeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
