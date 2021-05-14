import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedJobElementComponent } from './applied-job-element.component';

describe('AppliedJobElementComponent', () => {
  let component: AppliedJobElementComponent;
  let fixture: ComponentFixture<AppliedJobElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedJobElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedJobElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
