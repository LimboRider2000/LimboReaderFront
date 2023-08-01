import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConfirmPageComponent } from './my-confirm-page.component';

describe('ConfirmPageComponent', () => {
  let component: MyConfirmPageComponent;
  let fixture: ComponentFixture<MyConfirmPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyConfirmPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyConfirmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
