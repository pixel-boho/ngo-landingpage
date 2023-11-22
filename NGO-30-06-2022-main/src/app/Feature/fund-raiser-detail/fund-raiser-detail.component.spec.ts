import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRaiserDetailComponent } from './fund-raiser-detail.component';

describe('FundRaiserDetailComponent', () => {
  let component: FundRaiserDetailComponent;
  let fixture: ComponentFixture<FundRaiserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundRaiserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundRaiserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
