# AngularCreateWebComponent

Simple showcase hot to create web component (custom element) using Angular (version 12.2.6)

## How to Create Web Component with Angular

1. Install Angular Elements which allows us to transform an Angular component to a custom element (Web Component).

```
ng add @angular/elements
```

2. Create an Angular Component

```
ng g c my-element
```

3. Do the changes in app.moduel.ts\
   a. Optionally remove app.component (so we don`t mix default root component)\
   b. Remove **bootstrap** and add **entryComponents**
   ```typescript
   //bootstrap: [AppComponent],
   entryComponents: [MyElementComponent]</code>
   ```
   c. update class AppModule. Important is the name of your element! In this example **'my-element'**

```typescript
export class AppModule {
  constructor(private injector: Injector) {}
  ngDoBootstrap() {
    const el = createCustomElement(MyElementComponent, {
      injector: this.injector,
    });
    customElements.define("my-element", el);
  }
}
```

4. Make your required changes in the custom element component
5. For your Development server change content of index.html file. Replace <code>\<app-root><\/app-root></code> with <code>\<my-element><\/my-element></code>
6. Development server will work
7. We need to build, extract and bundle all required code to be able use it externally\
    a.

   ```
   npm install --save-dev concat fs-extra
   ```

   b. In the root of our project create a **bundle-web-component.js** with following code:

   ```javascript
   const fs = require("fs-extra");
   const concat = require("concat");
   (async function build() {
     const files = [
       "./dist/angular-create-web-component/polyfills.js",
       "./dist/angular-create-web-component/runtime.js",
       "./dist/angular-create-web-component/main.js",
     ];
     await fs.ensureDir("element");
     await concat(files, "element/my-element.js");
     await fs.copyFile(
       "./dist/angular-create-web-component/styles.css",
       "element/styles.css"
     );
   })();
   ```

   c. Update your package.json scripts:

   ```
   "build": "ng build --output-hashing none && node bundle-web-component.js",
   ```

   d.

   ```
   npm run build
   ```

   e. This creates **my-element.js** inside **element** folder.

**Notes:**

- styles are bundled inside my-element.js
- For more complex components it is important to correctly handle component Encapsulation (Example encapsulation: ViewEncapsulation.None)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

```

```
