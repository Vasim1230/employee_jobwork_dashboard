import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasictimesheetComponent } from './basictimesheet.component';

describe('BasictimesheetComponent', () => {
  let component: BasictimesheetComponent;
  let fixture: ComponentFixture<BasictimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasictimesheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasictimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
