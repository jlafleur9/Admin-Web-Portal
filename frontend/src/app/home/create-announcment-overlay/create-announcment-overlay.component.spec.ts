import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnouncmentOverlayComponent } from './create-announcment-overlay.component';

describe('CreateAnnouncmentOverlayComponent', () => {
  let component: CreateAnnouncmentOverlayComponent;
  let fixture: ComponentFixture<CreateAnnouncmentOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAnnouncmentOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnnouncmentOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
