import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { SecondaryComponent } from './secondary.component';

describe('SecondaryComponent', () => {
  let component: SecondaryComponent;
  let fixture: ComponentFixture<SecondaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [SecondaryComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should alter SecondaryComponent.secondaryInput to include "Altered"', async(() => {
    const mainComponent = TestBed.createComponent(SecondaryComponent);

    expect(/Altered/.test(mainComponent.debugElement.nativeElement.querySelector('#secondaryInput').innerHTML)).toBeFalsy();
    mainComponent.debugElement.nativeElement.querySelector('#btn-alter').click();
    mainComponent.detectChanges();
    expect(/Altered/.test(mainComponent.debugElement.nativeElement.querySelector('#secondaryInput').innerHTML)).toBeTruthy();
  }));
});
