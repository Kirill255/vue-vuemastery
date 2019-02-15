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

#### In-Component Route Guards

Once again we have a valid solution, but there is one more way to do this which I know I liked the most. If you’re coding along with us, the next lesson is where you’ll want to follow along.

#### Global and Per-Route Guards

In case you’re wondering, here’s the calling order:

![calling_order](https://user-images.githubusercontent.com/24504648/52001503-a154d680-24d0-11e9-9b23-709bd11e34e8.jpeg)

#### Architectural Choice: Removing Vuex from our Components

Before we move on to the other components, there’s some fun refactoring we could do to this EventShow page. We could completely remove Vuex from EventShow , and send in event as a prop from our new Per-Route Guard. Our EventShow component ends up shrinking a lot.

In the code above, we now take the event which is returned and set it to the value of routeTo.params.event . Then after next() is called. Since props: true is set for the component, params.event gets sent in as the event prop, like we were doing with id before.

Notice how our then callback now has an event parameter, which is filled by the event that returns from the API. To make sure the value gets sent in the callback, we’ll need to add two returns to our event Module.

Now when our fetchEvent Action is called, it returns our event so our router can send it into EventShow as a prop. Pretty nifty, huh? It works just the same, but now the EventList component has one less dependency, making it easier to test and scale.

#### Completing our Progress Bar (Using the Progress Bar with EventList)

Could we use beforeEnter? Nope!!! beforeEnter is only called when the component is created! When we click the next page link, the component is reused. And nothing would happen.

From our lesson on In-Component Route guards we learned that beforeRouteEnter is called when the component is created and beforeRouteUpdate is called when the route changes, but we’re still using the same component. This is what we need to ensure fetchEvents is called when we paginate.

Since both beforeRouteEnter and beforeRouteUpdate need to essentially call the same code, I’m going to extract this duplicate code into a function at the top of our EventList component

You might have noticed: We didn’t remove Vuex from the component.

Before we move on, I want to recognize that we did not remove Vuex from our component code in EventList, like we did with EventShow. We certainly could have passed EventList all of the props it needed to load through the router, like so:

```js
...
    routes: [
    {
        path: '/',
        name: 'event-list',
        component: EventList,
        props: route => ({
            page: route.params.page,
            perPage: route.params.perPage,
            events: route.params.events,
            eventTotal: route.params.eventTotal
        })
    },
...
```

However, we don’t have to go down this road, and set all these values. We already had to load in Vuex inside EventList for beforeRouteUpdate and beforeRouteEnter , so we can keep the Vuex code the same. Again, this is a matter of preference.

#### Completing our Progress Bar (Using the Progress Bar with EventCreate)

We need to do two things here. We need to start the progress bar before we dispatch the event shown here, and we need to stop the progress bar if our Action errors out.

As you can see, we’re just starting the NProgress bar and stopping it if we error out. When the Action is successful, we don't need to stop the progress bar, we still use the router to push to the EventShow view, just like we were before.

When our router follows this path it will call NProgress.start() again. But since it’s already running, nothing new will happen and it will finish loading once the fetchEvent action is complete.

### Error Handling

#### Not Found 404

Let’s create a generic Not Found Component that we’ll redirect to when a path is accessed that doesn’t exist.

As you can see, we’re creating a 404 path and name which loads our NotFound component, and then we are redirecting to the 404 path when we hit our new catch-all route.

There is a reason we’re redirecting to our 404 page (rather than just rendering the component), which will become clear in a minute

#### What about when we try to view a non-existent Event?

Right now, when we go to an event that doesn’t exist, like /event/1233 we see this:

![non-existent_event](https://user-images.githubusercontent.com/24504648/52012409-8ba0da80-24eb-11e9-9ac7-cf42c1df28fd.jpeg)

It’s not horrible, but nothing renders onto the page except a notification. A better solution would be to add onto our NotFound component and navigate the user there. The great part about navigation guards is that we can change where the user is navigating based on a condition (like if the event exists). Let’s try it!

You also should notice that I’m sending a resource parameter into our 404 component. This will allow me to write a more descriptive error message on our 404 page. In order to receive this param as a prop, I added props: true to my 404 path, added this param to our catch-all route configuration, and now I need to receive that param as an optional prop in my NotFound component.

The only issue with this solution is that we’re assuming all network errors we receive are 404 errors. However, what if the user’s Internet just died or they’re on a super slow connection? We don’t want to give them a 404 error if their Internet dies, but that’s what’s going to happen right now, so let’s fix this.

Creating a new NetworkIssue component. Also, in EventService, let’s set a timeout, so that if our browser waits longer than 15 seconds for the API request to return, it’ll automatically throw an error that will lead to our NetworkIssue component.

### BaseInput component

#### Inheriting Attributes

We’re getting closer to making this BaseInput a standalone, reusable component. But notice how our type and placeholder attributes are still on this input element:

```vue
<input
    :value="value"
    @input="updateValue"
    type="text" <!-- still here -->
    placeholder="Add an event title" <!-- still here -->
/>
```

We could make BaseInput more flexible by cutting out these attributes from within the component, and adding them when we actually use the component, like so:

```vue
<BaseInput
  v-model="event.title"
  label="Title"
  type="text"
  placeholder="Add an event title"
/>
```

Now these attributes, type and placeholder, will be inherited by the BaseInput component. But there’s a problem with inheriting attributes like this. When we do so, those attributes are inherited by the root element, in this case the div that wraps everything:

```vue
<template>
  <div>
    <!-- this is where attributes will be inherited -->
    <label v-if="label">{{ label }}</label>
    <input :value="value" @input="updateValue" />
  </div>
</template>
```

However, we can add an option to our component to turn off this automatic inheritance, with `inheritAttrs: false`. Then by using \$attrs we can manually decide which element to forward our attributes to, like so:

```vue
<input
    :id="label"
    :value="value"
    v-bind="$attrs" <!-- specifies this element will inherit attributes -->
    @input="updateValue"
/>
```

Now only our input element will inherit our attributes.

Notice how our base components have a class of field. This is a global style we’re using to add some margin spacing.

### BaseSelect component

#### Getting more complex

While BaseSelect will work if our options are primitive data types, such as strings or integers, what if our our options were an array of objects? Or what if we needed the ability to select multiple options, not just one?

For more complex selecting components, we recommend exploring [vue-multiselect](https://github.com/shentao/vue-multiselect). This is a robust library created and maintained by Core Vue Team Member Damian Dulisz.

### BaseButton component

### Dynamic Button Styles

Now we need to think about how we can add dynamic styles to our button. You might think that the solution would be to set inheritAttrs to false like we did in our BaseInput lesson, which allowed us to inherit attributes added on the parent scope.

However, this isn’t currently how Vue works. As of now, the class and style attributes aren’t available to you on \$attrs . However, we can expect that to change in Vue 3.

So if we can’t v-bind to our \$attrs , how can we apply a dynamic class to our BaseButton? We can use props for that.

Even though class and style aren’t currently available t us in \$attrs , we’ll still want to be inheriting attributes because we still want to have the ability to inherit attributes added on the parent scope, such as disabled .

### Form Validation with Vuelidate

#### BaseSelect

Now this all should work, right? Let’s check the browser to make sure. We’ll focus on the the category field, then click away from it (blur), and our error message and styling should appear. But wait… nothing is happening. The error message isn’t showing up. What’s going on here?

Well, we’ve added that blur event listener to BaseSelect, but we haven’t given the native select element inside of BaseSelect the ability to inherit that event listener. Fortunately this is an easy fix.

Remember when we created our BaseButton in a previous lesson? We added v-on="$listeners" to the native button element within it so that it could inherit the event listeners added in the parent scope. We can do the same thing and add v-on="$listeners" to our BaseSelect component’s select element so it can inherit the blur event listener.

#### BaseInput

We’ll also make sure to inherit the blur event listener and all other potential listeners on the input element of BaseInput, just like we did with BaseSelect ’s select element.

Now let’s test this out in the browser. We’ll focus on the field, then click away from it, which should trigger our error message and styling.

Great it’s working so far. But when we actually try to input a title here, we get this weird [object InputEvent] showing up.

Oh geez… what’s going on here? The reason for this strange behavior is a bit complicated to grasp, so let’s tackle this piece by piece.

We have v-model on our BaseInput:

```vue
<BaseInput
  label="Title"
  placeholder="Title"
  type="text"
  class="field"
  :class="{ error: $v.event.title.$error }"
  v-model="event.title" <!-- right here -->
  @blur="$v.event.title.$touch()"
/>
```

As we covered in our lesson where we built BaseInput , v-model is really just syntactic sugar. In this case, v-model=`"`event.title``" translates to:

```js
:value="event.title"
@input="(value) => { event.title = value }"
```

Why is this important? Well, this means we have a listener here for the input event. And since we just added v-on=`"`\$listeners``" that means we are inheriting that input event listener onto our BaseInput’s input element.

```vue
<input
  :value="value"
  v-bind="$attrs"
  @input="updateValue"
  v-on="$listeners"
>
```

And why is that important? Well, look again at what’s on that element. We’ve also got @input="updateValue" . That means we have two input event listeners. One that is triggering the updateValue method, and one that we’re inheriting from the parent scope, which is hidden under the sugar-coating of our v-model . This means we have a conflict, and the second input (the one from the v-model ) is taking precedence.

Okay so we know what caused this funky behavior. But how do we fix it? Take a few deep breaths, because the solution to this problem is as convoluted as the issue that caused it.

Resolving Our Conflict.

If two people are in conflict about something, what’s a good way to resolve that? How about they shake hands and compromise? What does this have to do with our code? Well, that’s basically what we’re about to implement: a compromise. We can encapsulate that compromise within a computed property, which we’ll call listeners.

```js
computed: {
  listeners() {
    return {
      ...this.$listeners,
      input: this.updateValue
    }
  }
}
```

Since both of our input events want to exist but they’re currently messing with each other, the compromise is: they can both exist alongside each other within a listeners object, which our computed property returns. Notice how we’re using the object spread operator to merge the inherited \$listeners into this object (i.e. the input event listener hidden in v-model ), and below that is a property for our input event that triggers the updateValue method.

Since there are now two input definitions on this object. Because of the way JavaScript objects work, the one that is defined last will take precedence. In this case, the input event that triggers our updateValue method takes precedence, which solves our issue!

Now, in the template, we can simply add our computed listeners(listeners, not \$listeners) to the input element.

```vue
<input :value="value"
  v-bind="$attrs"
  v-on="listeners"
>
```

#### Date, datepicker

We’ve reached our final field that needs to be validated, which is our date . This one is a bit special since we’re using [vuejs-datepicker](https://www.npmjs.com/package/vuejs-datepicker), a third-party Vue component. But the steps we’ll take are the same.

We’ll add an error message and wrap it in a conditionally displayed template. But instead of triggering Vuelidate’s \$touch method on blur , since that won’t be available to us due to the way this component is written, we’ll instead use vuejs-datepicker’s opened event listener.

```vue
<div class="field">
  <label>Date</label>
  <datepicker
    placeholder="Select a date"
    v-model="event.date"
    @opened="$v.event.date.$touch()" <!-- triggering $touch on opened -->
  />
</div>
<template v-if="$v.event.date.$error">
  <p v-if="!$v.event.date.required" class="errorMessage">Date is required.</p>
</template>
```

This will give us essentially the same behavior as our blur did. When a user opens this component, $v.event.date will be touched and therefor $dirty . By “open”, we’re referring to when a user clicks on the component and the box opens, allowing for a date to be selected.

Great. Now the last step is to add some dynamic error class binding to this field. This is also a bit unique. Instead of binding to the actual class attribute, we’ll bind to input-class , which is a prop provided to us by vuejs-datepicker.

```vue
<div class="field">
  <label>Date</label>
  <datepicker
    placeholder="Select a date"
    v-model="event.date"
    @opened="$v.event.date.$touch()"
    :input-class="{ error: $v.event.date.$error }" <!-- binding error class -->
  />
</div>
<template v-if="$v.event.date.$error">
  <p v-if="!$v.event.date.required" class="errorMessage">Date is required.</p>
</template>
```

If you continue using this datepicker component and need to manipulate it in ways we haven’t covered yet, check out the docs, as they are pretty helpful for figuring out what unique code might be needed to achieve your implementation. As you’ll see in the “Events” section, there is also a “closed” event. That would have been even closer to replicating the blur event; however, when we tried using that, it didn’t work for us and we discovered there’s an ongoing [issue](https://github.com/charliekassel/vuejs-datepicker/issues/625) with it. So we are going with opened instead, which works for our needs.

it's strange but both events didn't work for me!!! Maybe this is because i'm using a different version, I use "vuejs-datepicker": "^1.5.4", in this course "vuejs-datepicker": "^1.5.3".
