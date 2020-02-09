# ReduxExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

test

## Demo

https://redux-example-82e3f.firebaseapp.com/login

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## LOG
Generamos componentes

1. dashboard `ng g c dashboard --spec=false -is`
1. auth components
  1. login `ng g c auth/login --spec=false -is`
  1. register `ng g c auth/register --spce=false -is`
1. shared components
  1. footer `ng g c shared/footer --spec=false -is`
  1. navbar `ng g c shared/navbar --spec=false -is`
  1. sidebar `ng g c shared/sidebar --spec=false -is`
1. router
  1. `ng g m app-routing --module=app --routing --spec=false`
  1. delete duplicate module
  1. configurar rutas base, RouterModule.forRoot
