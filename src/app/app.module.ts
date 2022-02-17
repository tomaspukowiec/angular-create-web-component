import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MyElementComponent } from './my-element/my-element.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [MyElementComponent],
  imports: [BrowserModule],
  providers: [],
  //bootstrap: [AppComponent],
  entryComponents: [MyElementComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(MyElementComponent, {
      injector: this.injector,
    });
    customElements.define('my-element', el);
  }
}
