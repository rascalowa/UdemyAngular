import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }
  //in constructor we need to include access to template and place in the document when we want to render it (view container). Both injected in (constructor)
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
