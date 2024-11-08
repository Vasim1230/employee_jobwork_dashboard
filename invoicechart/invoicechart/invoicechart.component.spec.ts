import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicechartComponent } from './invoicechart.component';

describe('InvoicechartComponent', () => {
  let component: InvoicechartComponent;
  let fixture: ComponentFixture<InvoicechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicechartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
