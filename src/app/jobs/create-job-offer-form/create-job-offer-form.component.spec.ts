import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobOfferFormComponent } from './create-job-offer-form.component';

describe('CreateJobOfferFormComponent', () => {
  let component: CreateJobOfferFormComponent;
  let fixture: ComponentFixture<CreateJobOfferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJobOfferFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
