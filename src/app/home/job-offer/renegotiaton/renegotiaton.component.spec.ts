import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenegotiatonComponent } from './renegotiaton.component';

describe('RenegotiatonComponent', () => {
  let component: RenegotiatonComponent;
  let fixture: ComponentFixture<RenegotiatonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenegotiatonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenegotiatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
