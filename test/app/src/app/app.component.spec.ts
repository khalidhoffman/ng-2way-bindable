import {
  TestBed,
  async
} from '@angular/core/testing';

import { AppComponent }       from './app.component';
import { SecondaryComponent } from './secondary/secondary.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SecondaryComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should be alterable via 2-way binding to child component', async(() => {
    const appComponent = TestBed.createComponent(AppComponent);
    const childComponent = TestBed.createComponent(SecondaryComponent);
    const childComponentAlterBtn = childComponent.debugElement.nativeElement.querySelector('#btn-alter');

    expect(/Altered/.test(appComponent.debugElement.nativeElement.querySelector('#primary').innerHTML)).toBeFalsy();
    childComponentAlterBtn.click();
    appComponent.detectChanges();
    expect(/Altered/.test(appComponent.debugElement.nativeElement.querySelector('#primary').innerHTML)).toBeTruthy();
  }));
});
