import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasecomponentComponent } from './casecomponent.component';

describe('CasecomponentComponent', () => {
  let component: CasecomponentComponent;
  let fixture: ComponentFixture<CasecomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasecomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
