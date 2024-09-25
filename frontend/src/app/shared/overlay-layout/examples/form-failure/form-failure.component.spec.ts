import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFailureComponent } from './form-failure.component';

describe('FormFailureComponent', () => {
  let component: FormFailureComponent;
  let fixture: ComponentFixture<FormFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFailureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
