import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenGenerationAddComponent } from './token-generation-add.component';

describe('TokenGenerationAddComponent', () => {
  let component: TokenGenerationAddComponent;
  let fixture: ComponentFixture<TokenGenerationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenGenerationAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenGenerationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
