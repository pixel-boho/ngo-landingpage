import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawStartFundraiserComponent } from './withdraw-start-fundraiser.component';

describe('WithdrawStartFundraiserComponent', () => {
  let component: WithdrawStartFundraiserComponent;
  let fixture: ComponentFixture<WithdrawStartFundraiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawStartFundraiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawStartFundraiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
