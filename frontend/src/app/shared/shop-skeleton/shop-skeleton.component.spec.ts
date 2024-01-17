import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSkeletonComponent } from './shop-skeleton.component';

describe('ShopSkeletonComponent', () => {
  let component: ShopSkeletonComponent;
  let fixture: ComponentFixture<ShopSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
