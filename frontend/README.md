# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6 and has been migrated to Angular v18 with the Angular CLI version 18.2.5

## Styling Guide
We're using [Angular Material](https://material.angular.io/) in this project, which follows the [Material Design 3](https://m3.material.io/) design system from Google.

### Theme
We generated a custom Angular theme using the Angular Material 3 [Theme schematic](https://material.angular.io/guide/schematics#material-3-theme-schematic).
This schematic generates an entire color palette from just one seed color. We chose `#1BA098` as the seed color, since that seems to be the primary color used in the Figma design (it's the color of the blue buttons).
You can find this generated theme in the `frontend/src/styles` folder.

The theme is included in our root css file (`frontend/src/styles.scss`). The theme creates a bunch of CSS variables prefixed with `--sys` that you could use in your CSS files.

There is one small problem, the actual primary color and other colors generated from the schematic don't match up exactly with the colors used in the Figma design (ideally the theme would be generated before designing).
So we made the following overrides in our styles.scss file:

```scss
:root {
  // Angular Material overrides
  --sys-primary: #1BA098;
  --sys-primary-container: #0B2D45;
  --sys-background: #051622;
  --sys-secondary: #DEB992;

  // Our own custom variables
  --sys-on-select-field: #5533FF;
}
```

These CSS variables are colors used in the Figma design. The Angular Material overrides change the colors for some variables Angular Material creates. Here's how you can use CSS variables in your stylesheets:
```css
.example {
  background-color: var(--sys-primary-container);
}
```

If you want to see all the CSS variables available in your environment, your IDE should show you suggestions of variables
as you type them in the `var()` argument. Try typing `--sys` to see all the available styles.

### Material Components
Angular Material provides implementations of components as defined by the Material Design system. You can view a list of all Angular Components [here](https://material.angular.io/components/categories).
Angular Material uses the current theme to decide how to style a component.

Because the theme colors don't exactly line up with our design, some components will need some color overrides. Note that some Angular Material components are easier to
style than others (especially form components). Here's a common way to update the styling of an Angular Material component:

```css
.example-class {
  background-color: var(--sys-primary) !important;
}
```

`.example-class` could be added to an Angular Material component tag. The addition of `!important` ensures that if the Angular Material component has the same style defined
(in this case `background-color`), then ours would take precedence.

This wouldn't work if the style we're trying to change is in a nested element (an Angular Material component can create nested elements. It's best to avoid trying to style those).
There are more involved ways to customize component styles which you can read about [here](https://material.angular.io/guide/customizing-component-styles).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

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
