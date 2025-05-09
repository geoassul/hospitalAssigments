import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeToniComponent } from './home-toni.component';

describe('HomeToniComponent', () => {
  let component: HomeToniComponent;
  let fixture: ComponentFixture<HomeToniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeToniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeToniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
