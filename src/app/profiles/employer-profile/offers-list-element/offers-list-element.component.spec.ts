import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersListElementComponent } from './offers-list-element.component';

describe('OffersListElementComponent', () => {
  let component: OffersListElementComponent;
  let fixture: ComponentFixture<OffersListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffersListElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
