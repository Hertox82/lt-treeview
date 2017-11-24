import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LtTreeviewInternalComponent } from './lt-treeview-internal.component';

describe('LtTreeviewInternalComponent', () => {
  let component: LtTreeviewInternalComponent;
  let fixture: ComponentFixture<LtTreeviewInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LtTreeviewInternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LtTreeviewInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
