import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectmanageComponent } from './projectmanage.component';

describe('ProjectmanageComponent', () => {
  let component: ProjectmanageComponent;
  let fixture: ComponentFixture<ProjectmanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectmanageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
