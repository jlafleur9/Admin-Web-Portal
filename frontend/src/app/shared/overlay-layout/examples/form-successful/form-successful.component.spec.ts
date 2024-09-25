import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSuccessfulComponent } from './form-successful.component';

describe('FormSuccessfulComponent', () => {
  let component: FormSuccessfulComponent;
  let fixture: ComponentFixture<FormSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSuccessfulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
