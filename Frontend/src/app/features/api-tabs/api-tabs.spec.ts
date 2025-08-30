import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTabs } from './api-tabs';

describe('ApiTabs', () => {
  let component: ApiTabs;
  let fixture: ComponentFixture<ApiTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiTabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
