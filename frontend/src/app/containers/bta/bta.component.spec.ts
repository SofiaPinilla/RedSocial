import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtaComponent } from './bta.component';

describe('BtaComponent', () => {
  let component: BtaComponent;
  let fixture: ComponentFixture<BtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
