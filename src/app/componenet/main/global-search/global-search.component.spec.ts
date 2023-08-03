import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSearch } from './global-search.component';

describe('HeaderBottomComponent', () => {
  let component: GlobalSearch;
  let fixture: ComponentFixture<GlobalSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalSearch ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
