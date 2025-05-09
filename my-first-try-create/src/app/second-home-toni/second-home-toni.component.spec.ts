import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondHomeToniComponent } from './second-home-toni.component';

describe('SecondHomeToniComponent', () => {
  let component: SecondHomeToniComponent;
  let fixture: ComponentFixture<SecondHomeToniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondHomeToniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondHomeToniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
