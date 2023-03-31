# Cat Wiki - Build Document
- [Cat Wiki - Build Document](#cat-wiki---build-document)
  - [Assumptions](#assumptions)
  - [Technical Stack](#technical-stack)
    - [Server](#server)
    - [Client](#client)
  - [Build Log](#build-log)

---
## Assumptions
This is a minimal implementation of the Cat Wiki. Items that will ommited are:
- System or Record (SoR) (e.g. NoSQL / Relation Database) for peristing custom user data - such as the 10 top search results

---
## Technical Stack

### Server
|item| tech | description|
|---|---|---|
|Framework | ExpressJS | will be used to construct our client API to integrate with The Cat API (https://thecatapi.com)|
|Testing | Jest| could use Jasmine / Mocha, but lets keep it the same as the Front end|

### Client
|item| tech | description|
|---|---|---|
| Client Framework | ReactJS | will be used to be Single Page App (SPA)|
|Routing| react-router| use to navigate between pages components|
|State Management| Redux Toolkit (RTK) | will be using this as state management + the Query API for retrieving data from the Client API (using this over Axios as it is an all in one system that integrates with the state management)|
|Styling | TailwindCSS| Utility Library to assist with quick prototyping and eliminates the need to write custom styles - the long class stacking may look jarring but it's quite nice to work with|
| Testing | Jest | unit testing framework for front end|
| UI Doc & Testing | Storybook | Great Component Library documentation tool + excellent test harness for component building & viewing any Accessibility issues (https://storybook.js.org/addons/@storybook/addon-a11y)|

---

## Build Log
