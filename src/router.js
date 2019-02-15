import Vue from "vue";
import Router from "vue-router";
import EventCreate from "./views/EventCreate.vue";
import EventList from "./views/EventList.vue";
import EventShow from "./views/EventShow.vue";
import NotFound from "./views/NotFound.vue";
import NetworkIssue from "./views/NetworkIssue.vue";
import Example from "./views/Example.vue";
import store from "@/store/store";
import NProgress from "nprogress";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "event-list",
      component: EventList,
      props: true
    },
    {
      path: "/example",
      component: Example
    },
    {
      path: "/event/:id",
      name: "event-show",
      component: EventShow,
      props: true, // Set params to props
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch("event/fetchEvent", routeTo.params.id)
          .then(event => {
            routeTo.params.event = event; // Set the event we retrieved
            next();
          })
          .catch(error => {
            // only if response status is 404, show the 404
            if (error.response && error.response.status == 404) {
              // on error redirect to 404 with name of resource missing, we can use it in template
              next({ name: "404", params: { resource: "event" } });
            } else {
              next({ name: "network-issue" });
            }
          });
      }
    },
    {
      path: "/event/create",
      name: "event-create",
      component: EventCreate
    },
    {
      path: "/404",
      name: "404",
      component: NotFound,
      props: true // send in resource param as prop
    },
    {
      path: "/network-issue",
      name: "network-issue",
      component: NetworkIssue
    },
    // will catch all navigation that doesn't match
    {
      path: "*",
      redirect: { name: "404", params: { resource: "page" } }
    }
  ]
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
