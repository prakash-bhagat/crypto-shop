import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOrderHistoryComponent } from './model-order-history.component';

describe('ModelOrderHistoryComponent', () => {
  let component: ModelOrderHistoryComponent;
  let fixture: ComponentFixture<ModelOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelOrderHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
