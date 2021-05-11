import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFormFieldAutocompleteComponent } from './dashboard-form-field-autocomplete.component';

describe('DashboardFormFieldAutocompleteComponent', () => {
  let component: DashboardFormFieldAutocompleteComponent;
  let fixture: ComponentFixture<DashboardFormFieldAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardFormFieldAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFormFieldAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
