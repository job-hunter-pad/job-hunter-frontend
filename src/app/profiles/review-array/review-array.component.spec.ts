import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewArrayComponent } from './review-array.component';

describe('ReviewArrayComponent', () => {
  let component: ReviewArrayComponent;
  let fixture: ComponentFixture<ReviewArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
