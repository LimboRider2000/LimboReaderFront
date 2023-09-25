import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineReaderComponent } from './online-reader.component';

describe('OnlineReaderComponent', () => {
  let component: OnlineReaderComponent;
  let fixture: ComponentFixture<OnlineReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineReaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
