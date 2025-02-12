import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsermodelComponent } from './add-usermodel.component';

describe('AddUsermodelComponent', () => {
  let component: AddUsermodelComponent;
  let fixture: ComponentFixture<AddUsermodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUsermodelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUsermodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
