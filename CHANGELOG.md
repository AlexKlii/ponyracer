# Changelog

## 0.32.0 (2023-10-17)

### 36 - Integrate with a UI library

- Implement `ng-bootstrap` UI library
- Replace `AlertComponent` by `NgbAlert`
- Implement `NgbPagination` to `FinishedRacesComponent`
- Implement `NgbCollapse` to `MenuComponent`
- Update e2e and unit test

<details>
  <summary>See old changelogs</summary>

  ## 0.31.0 (2023-10-17)

  ### 35 - Building advanced directives

  - Implement `FormLabelDirective`, `FormControlValidationDirective` and `FormLabelValidationDirective`
  - Update e2e and unit test
  
  ## 0.30.0 (2023-10-17)

  ### 34 - Building advanced components

  - Implement `AlertComponent`
  - Update e2e and unit test
  
  ## 0.29.0 (2023-10-17)

  ### 33 - Lazy loading

  - Update routing in `app.routes.ts` file to implement lazy loading
  - Update e2e and unit test
  
  ## 0.28.0 (2023-10-17)

  ### 32 - Resolvers, child routes and redirections

  - Implement `FinishedRacesComponent` and `PendingRacesComponent`
  - Implement `raceResolver` and `racesResolver`
  - Update `RacesComponent` to implement the new components
  - Update `LiveComponent` and `BetComponent` to implement resolver
  - Update `app.route.ts` file
  - Update e2e and unit test
  
  ## 0.27.0 (2023-10-16)

  ### 31 - Protected routes with guards

  - Implement `loggedInGuard` on `races` routes
  - Update e2e and unit test

  ## 0.26.0 (2023-10-16)

  ### 29 - Reactive user score

  - Add `scoreUpdates` method to `UserService`
  - Update `MenuComponent` to implement reactive user score
  - Update e2e and unit test
  
  ## 0.25.0 (2023-10-16)

  ### 28 - Boost a pony

  - Add `boost` method to `RaceService`
  - Update `LiveComponent` to boost a pony
  - Update `PonyComponent` to display the boosted pony
  - Update `PonyWithPositionModel`
  - Add images for boosted ponies in `assets/images`
  - Update e2e and unit test
  
  ## 0.24.0 (2023-10-16)

  ### 27 - Observable tips and tricks

  - Update `LiveComponent` to implement race status
  - Update `live` method from `RaceService`
  - Update `RaceModel`
  - Update e2e and unit test
  
  ## 0.23.0 (2023-10-16)

  ### 26 - WebSockets

  - Add `wsBaseUrl` environment variable
  - Add `app.token.ts` file
  - Add `LiveRaceModel` model
  - Implement `WsService`
  - Update `live` method from `RaceService` 
  - Update e2e and unit test
  
  ## 0.22.0 (2023-10-16)

  ### 25 - Live race

  - Implement `LiveComponent`
  - Add `live` method to `RaceService`
  - Update `getPonyImageUrl` from `PonyComponent`
  - Add images for running ponies in `assets/images`
  - Update e2e and unit test
    
  ## 0.21.0 (2023-10-16)

  ### 24 - Cancel a bet

  - Add `cancelBet` method to `RaceService`
  - Implement this new method to `BetComponent`
  - Update e2e and unit test
  
  ## 0.20.0 (2023-10-16)

  ### 23 - Bet on a pony

  - Add `get` and `bet` method to `RaceService`
  - Update `RaceModel`
  - Implement `BetComponent`
  - Update e2e and unit test
  
  ## 0.19.0 (2023-10-15)

  ### 22 - HTTP with authentication

  - Implement `jwtInterceptor` to set request headers when connected
  - Add `getCurrentUser` method to `UserService`
  - Refactor `environments` files
  - fix `angular.json` file
  - Update e2e and unit test
  
  ## 0.18.0 (2023-10-15)

  ### 20 - Logout

  - Add a `logout` method to `UserService`
  - Implement `logout` method to `MenuComponent`
  - Update e2e and unit test

  ## 0.17.0 (2023-10-15)

  ### 19 - Remember me

  - Implement `retrieveUser` and `storeLoggedInUser` methods to `UserService`
  - Update e2e and unit test
  
  ## 0.16.0 (2023-10-15)

  ### 18 - Logged home

  - Update `MenuComponent` and `HomeComponent` to display links compared to the user
  - Update e2e and unit test
  
  ## 0.15.0 (2023-10-15)

  ### 17 - Display the user

  - Update `UserService` to emit the connected user
  - Update `MenuComponent` to display the connected user
  - Update e2e and unit test

  ## 0.14.0 (2023-10-15)

  ### 16 - Login form

  - Implement `LoginComponent`
  - Add `authenticate` method to `UserService`
  - Update `HomeComponent`
  - Update e2e and unit test

  ## 0.13.0 (2023-10-15)

  ### 15 - Custom validators in forms

  - Add `UserModel`
  - Implement `UserService` to register a user
  - Update e2e and unit test
  
  ## 0.12.0 (2023-10-15)

  ### 14 - Register form

  - Implement `RegisterComponent`
  - Update e2e and unit test

  ## 0.11.0 (2023-10-15)

  ### 12 - Router

  - Update `AppComponent` to implement `RouterOutlet`
  - Implement `HomeComponent`
  - Update `MenuComponent` to implement `RouterLink`
  - Update e2e and unit test
  
  ## 0.10.0 (2023-10-15)

  ### 11 - HTTP

  - Add `status` constants file
  - Add `environment` files
  - Update `RaceService` to implement Http request
  - Update e2e and unit test
  
  ## 0.9.0 (2023-10-15)

  ### 10 - Observables with RxJS

  - Update `RaceService` to implement Observables
  - Update unit test
  
  ## 0.8.0 (2023-10-14)

  ### 8 - Race service

  - Implement `RaceService`
  - Update e2e and unit test

  ## 0.7.0 (2023-10-14)

  ### 7 - Custom pipe with date-fns

  - Add `date-fns` dependencie
  - Implement `FromNowPipe` using `date-fns`
  - Update e2e and unit test
  
  ## 0.6.0 (2023-10-14)

  ### 6 - Using pipes

  - Update `RaceComponent` to display race start date using pipe
  - Update e2e and unit test
  
  ## 0.5.0 (2023-10-14)

  ### 5 - Pony component

  - Implement `PonyComponent`
  - Add images for ponies in `assets/images`
  - Update e2e and unit test
  
  ## 0.4.0 (2023-10-14)

  ### 4 - Race detail

  - Implement `RaceComponent`
  - Add `PonyModel`
  - Update e2e and unit test
  
  ## 0.3.0 (2023-10-14)

  ### 3 - List of races

  - Implement `RacesComponent`
  - Update e2e and unit test
  
  ## 0.2.0 (2023-10-14)

  ### 2 - Templates

  - Implement `MenuComponent`
  - Update e2e and unit test

  ## 0.1.0 (2023-10-14)

  ### 0 - Getting started

  - Generate the angular project
  - Add some styles
  - Implement Unit tests
  - Implement End-to-end tests
  - Implement Lint

<details>