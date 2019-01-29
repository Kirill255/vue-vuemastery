# real-world-vue

https://github.com/Code-Pop/real-world-vue

## Following along?

We encourage you to follow the course on Vue Mastery, and code along with us. This course has tags representing the start and finish of each level, just in case you get stuck. Here's the start and ending code of each lesson, if you'd like to download them.

| Lesson                            |                                                                                                        |                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| 2 - Vue CLI                       | n/a                                                                                                    | [Finished Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson2-cli-finish)             |
| 3 - Optimizing your IDE           | [Starting Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson3-editor-start)          | [Finished Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson3-editor-finish)          |
| 4 - Vue Router Basics             | [Starting Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson4-routing-start)         | [Finished Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson4-routing-finish)         |
| 5 - Dynamic Routes & History Mode | [Starting Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson5-dynamic-routing-start) | [Finished Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson5-dynamic-routing-finish) |
| 6 - Single File Components        | [Starting Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson6-sfc-start)             | [Finished Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson6-sfc-finish)             |
| 7 - Global Components             | [Starting Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson7-global-start)          | [Finished Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson7-global-finish)          |
| 8 - Slots                         | [Starting Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson8-slots-start)           | [Finished Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson8-slots-finish)           |
| 9 - API Calls with Axios          | [Starting Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson9-axios-start)           | [Finished Code](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson9-axios-finish)           |

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

# Tips

### Problem: The Component isn’t reloading

What’s going on here, is that our router sees that we’re loading the same ‘event-list’ named route, so it doesn’t need to reload the component. This is like clicking a navigation link twice. When someone clicks on a navigation link twice and they’re already on that page, do we want it to reload the component? No. That’s what’s going on. created() is not getting called again when we go to the second page, because it’s not reloading the component.

Inevitably, you’ll run into this as a Vue developer: where you want to reload a component with a change of query parameters.

#### Solution: Updating our router view

There are two ways to fix this:

1. Watch the page computed property to see if it changes (which it does when we change the page), and when it does, dispatch the fetchEvent action.

2. Tell our router to reload components when the full URL changes, including the query parameters. We’ll do this. It’s super simple.

### Alternate Syntax for Modules

```js
// /src/store/store.js
import * as event from "@/store/modules/event.js";

// /src/store/modules/event.js
import EventService from '@/services/EventService.js'

// export const namespaced = true;
export const state = { ... }
export const mutations = { ... }
export const actions = { ... }
export const getters = { ... }
```

```js
// /src/store/store.js
import event from "@/store/modules/event.js";

// /src/store/modules/event.js
import EventService from '@/services/EventService.js'

export default {
    // namespaced: true,
    state: { ... },
    mutations: { ... },
    actions: { ... },
    getters: { ... }
}
```

Both syntaxes are correct, and the reason the first might be preferable is that it’s easier to create private variables and methods. However, both are correct to use.
