# ng-2way-bindable
2-way binding decorator for ng2+

### Example Use
```typescript
import { Component } from "@angular/core";
import { BindableInput } from "ng-2way-bindable";

@Component({
  selector: 'some-child-component',
  //...
})
export class SomeChildComponent {
    @BindableInput() twoWayBindedVar: any;
} 

@Component({
  //...
  template: `
  <some-child-component [(twoWayBindedVar)]='parentTwoWayBindedVar'></some-child-component>
  `
})
export class SomeParentComponent {
    parentTwoWayBindedVar: any;
} 
```