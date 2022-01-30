import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPropertyComponent } from './settings-property.component';

describe('SettingsPropertyComponent', () => {
  let component: SettingsPropertyComponent;
  let fixture: ComponentFixture<SettingsPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
