import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorscarouselComponent } from './actorscarousel.component';

describe('ActorscarouselComponent', () => {
  let component: ActorscarouselComponent;
  let fixture: ComponentFixture<ActorscarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorscarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActorscarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
