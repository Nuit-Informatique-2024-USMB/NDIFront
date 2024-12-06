import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TirComponent } from './tir.component';

describe('TirComponent', () => {
  let component: TirComponent;
  let fixture: ComponentFixture<TirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
