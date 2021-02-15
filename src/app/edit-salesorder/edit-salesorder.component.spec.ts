import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalesorderComponent } from './edit-salesorder.component';

describe('EditSalesorderComponent', () => {
  let component: EditSalesorderComponent;
  let fixture: ComponentFixture<EditSalesorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSalesorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalesorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
