import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateactorComponent } from './createactor.component';

describe('CreateactorComponent', () => {
  let component: CreateactorComponent;
  let fixture: ComponentFixture<CreateactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateactorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
