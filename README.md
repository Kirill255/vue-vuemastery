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

### json-server

`json-server -d 1500 db.json`

With the -d 1500 the API server will add a 1.5 second (1,500 millisecond) delay before returning our data.

### Progress Bar

#### Axios Interceptors

1. Not optimal for multiple API calls at the same time.

This works great until we are using two or more API calls to load a page. In this scenario we’d want to continue to show the progress bar until all API calls return. A common solution to this problem is to create a loading Vuex module that holds the loading State. If you’d like to continue down this road, you might want to check out [this post](https://medium.com/@LoCascioNick/create-a-global-loading-progress-indicator-using-vuex-axios-and-nprogress-20451b33145a) for another example implementation (Yes, the post is in TypeScript, but it’s still quite readable even if you’re not familiar).

2. Templates get rendered before the API call is returned.

On some webpages, it’s not a great user experience to see the page before the data is populated in it reactively. You’ll notice when we load up /event/5 (an event that we have to pull from the API) that the page loads empty before the data flashes onto the screen 1.5 seconds later. This is NOT an optimal user experience since the user sees the page broken before they see it working.
