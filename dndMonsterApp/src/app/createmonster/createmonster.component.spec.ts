import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemonsterComponent } from './createmonster.component';

describe('CreatemonsterComponent', () => {
  let component: CreatemonsterComponent;
  let fixture: ComponentFixture<CreatemonsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatemonsterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatemonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
