import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResultCardComponent } from './dashboard-result-card.component';

describe('DashboardResultCardComponent', () => {
  let component: DashboardResultCardComponent;
  let fixture: ComponentFixture<DashboardResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardResultCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
