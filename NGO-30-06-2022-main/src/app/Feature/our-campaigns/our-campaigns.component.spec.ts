import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurCampaignsComponent } from './our-campaigns.component';

describe('OurCampaignsComponent', () => {
  let component: OurCampaignsComponent;
  let fixture: ComponentFixture<OurCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
