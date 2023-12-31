import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationModalComponent } from './authentication-modal.component';

describe('AuntificationModalComponent', () => {
  let component: AuthenticationModalComponent;
  let fixture: ComponentFixture<AuthenticationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
