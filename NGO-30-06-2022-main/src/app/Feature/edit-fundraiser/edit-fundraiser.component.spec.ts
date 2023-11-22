import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFundraiserComponent } from './edit-fundraiser.component';

describe('EditFundraiserComponent', () => {
  let component: EditFundraiserComponent;
  let fixture: ComponentFixture<EditFundraiserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFundraiserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFundraiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
