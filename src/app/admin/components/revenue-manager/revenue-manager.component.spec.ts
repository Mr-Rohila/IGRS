import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueManagerComponent } from './revenue-manager.component';

describe('RevenueManagerComponent', () => {
  let component: RevenueManagerComponent;
  let fixture: ComponentFixture<RevenueManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
