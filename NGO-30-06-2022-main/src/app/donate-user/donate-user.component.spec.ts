import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateUserComponent } from './donate-user.component';

describe('DonateUserComponent', () => {
  let component: DonateUserComponent;
  let fixture: ComponentFixture<DonateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
