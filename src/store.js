import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: "abc123", name: "Adam Jahr" },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ],
    events: [],
    eventsTotal: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal;
    },
    SET_EVENT(state, event) {
      state.event = event;
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          // json-server is actually giving us this data on each event request listing as a header
          // console.log("Total events are " + response.headers["x-total-count"]);
          commit(
            "SET_EVENTS_TOTAL",
            parseInt(response.headers["x-total-count"])
          );
          commit("SET_EVENTS", response.data);
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    },
    fetchEvent({ commit, getters }, id) {
      // We’re Loading Data Twice. We happen to be loading all the data we need to show an event on the EventList page. If we view the EventList page first, then the EventShow page (which many users will do), it seems wasteful to do another call to the API, when we already have the data needed in hand. How might we save our code an extra call?

      var event = getters.getEventById(id);

      if (event) {
        commit("SET_EVENT", event);
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit("SET_EVENT", response.data);
          })
          .catch(error => {
            console.log("There was an error:", error.response);
          });
      }
    }
  },
  getters: {
    // https://vuex.vuejs.org/guide/getters.html#method-style-access
    getEventById: state => id => {
      return state.events.find(event => event.id === id);
    }
  }
});
