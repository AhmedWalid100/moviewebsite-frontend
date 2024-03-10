import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditactorComponent } from './editactor.component';

describe('EditactorComponent', () => {
  let component: EditactorComponent;
  let fixture: ComponentFixture<EditactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditactorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
