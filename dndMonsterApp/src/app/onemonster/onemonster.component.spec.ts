import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnemonsterComponent } from './onemonster.component';

describe('OnemonsterComponent', () => {
  let component: OnemonsterComponent;
  let fixture: ComponentFixture<OnemonsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnemonsterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnemonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
