import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayLayoutComponent } from './overlay-layout.component';

describe('OverlayLayoutComponent', () => {
  let component: OverlayLayoutComponent;
  let fixture: ComponentFixture<OverlayLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
