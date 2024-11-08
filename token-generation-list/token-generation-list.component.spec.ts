import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenGenerationListComponent } from './token-generation-list.component';

describe('TokenGenerationListComponent', () => {
  let component: TokenGenerationListComponent;
  let fixture: ComponentFixture<TokenGenerationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenGenerationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenGenerationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
