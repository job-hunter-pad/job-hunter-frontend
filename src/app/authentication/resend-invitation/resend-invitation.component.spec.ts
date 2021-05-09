import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendInvitationComponent } from './resend-invitation.component';

describe('ResendInvitationComponent', () => {
  let component: ResendInvitationComponent;
  let fixture: ComponentFixture<ResendInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendInvitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
