import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreBaseTemplateComponent } from './core-base-template.component';

describe('CoreBaseTemplateComponent', () => {
  let component: CoreBaseTemplateComponent;
  let fixture: ComponentFixture<CoreBaseTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreBaseTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreBaseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
