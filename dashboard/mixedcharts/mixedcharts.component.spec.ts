import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedchartsComponent } from './mixedcharts.component';

describe('MixedchartsComponent', () => {
  let component: MixedchartsComponent;
  let fixture: ComponentFixture<MixedchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixedchartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixedchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
