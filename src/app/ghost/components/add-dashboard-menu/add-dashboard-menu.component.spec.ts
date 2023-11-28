import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDashboardMenuComponent } from './add-dashboard-menu.component';

describe('AddDashboardMenuComponent', () => {
  let component: AddDashboardMenuComponent;
  let fixture: ComponentFixture<AddDashboardMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDashboardMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDashboardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
