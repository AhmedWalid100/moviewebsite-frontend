import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesectionComponent } from './homesection.component';

describe('HomesectionComponent', () => {
  let component: HomesectionComponent;
  let fixture: ComponentFixture<HomesectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomesectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomesectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
