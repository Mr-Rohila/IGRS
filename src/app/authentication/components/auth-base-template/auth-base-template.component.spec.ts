import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBaseTemplateComponent } from './auth-base-template.component';

describe('AuthBaseTemplateComponent', () => {
  let component: AuthBaseTemplateComponent;
  let fixture: ComponentFixture<AuthBaseTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthBaseTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthBaseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
