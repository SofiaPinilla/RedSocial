import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimedComponent } from './confimed.component';

describe('ConfimedComponent', () => {
  let component: ConfimedComponent;
  let fixture: ComponentFixture<ConfimedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfimedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
