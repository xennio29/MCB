import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TixbankComponent } from './tixbank.component';

describe('TixbankComponent', () => {
  let component: TixbankComponent;
  let fixture: ComponentFixture<TixbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TixbankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TixbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
