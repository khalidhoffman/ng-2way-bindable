import { Component } from '@angular/core';

import { BindableInput } from '../../../../../';

@Component({
  selector: 'app-secondary',
  templateUrl: './secondary.component.html',
  styleUrls: ['./secondary.component.css']
})
export class SecondaryComponent {
  @BindableInput() secondaryInput: string = 'secondaryVal';

  constructor() { }

  alterInput() {
    this.secondaryInput += 'Altered';
  }
}
