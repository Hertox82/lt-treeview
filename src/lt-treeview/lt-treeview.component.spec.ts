import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LtTreeviewComponent } from './lt-treeview.component';

describe('LtTreeviewComponent', () => {
  let component: LtTreeviewComponent;
  let fixture: ComponentFixture<LtTreeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LtTreeviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LtTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
