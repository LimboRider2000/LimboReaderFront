import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForReadComponent } from './for-read.component';

describe('ForReadComponent', () => {
  let component: ForReadComponent;
  let fixture: ComponentFixture<ForReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
