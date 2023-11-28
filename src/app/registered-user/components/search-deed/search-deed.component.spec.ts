import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDeedComponent } from './search-deed.component';

describe('SearchDeedComponent', () => {
  let component: SearchDeedComponent;
  let fixture: ComponentFixture<SearchDeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
