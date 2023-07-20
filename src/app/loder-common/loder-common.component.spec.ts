import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoderCommonComponent } from './loder-common.component';

describe('LoderCommonComponent', () => {
  let component: LoderCommonComponent;
  let fixture: ComponentFixture<LoderCommonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoderCommonComponent]
    });
    fixture = TestBed.createComponent(LoderCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
