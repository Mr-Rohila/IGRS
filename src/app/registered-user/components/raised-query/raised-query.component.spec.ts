import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedQueryComponent } from './raised-query.component';

describe('RaisedQueryComponent', () => {
  let component: RaisedQueryComponent;
  let fixture: ComponentFixture<RaisedQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaisedQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
