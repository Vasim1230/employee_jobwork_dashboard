import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxtimelineComponent } from './ngxtimeline.component';

describe('NgxtimelineComponent', () => {
  let component: NgxtimelineComponent;
  let fixture: ComponentFixture<NgxtimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxtimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxtimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
