import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmlPolicyComponent } from './aml-policy.component';

describe('AmlPolicyComponent', () => {
  let component: AmlPolicyComponent;
  let fixture: ComponentFixture<AmlPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmlPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmlPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
