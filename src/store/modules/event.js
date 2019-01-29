import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {}
};

export const mutations = {
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
};

export const actions = {
  /* eslint-disable-next-line */
  createEvent({ commit, dispatch, rootState }, event) {
    // Accessing State in Other Modules, I can access rootGetters in the same way
    // console.log("User creating Event is " + rootState.user.user.name);

    // Without namespaced = true !!!
    // Accessing another Module’s Actions. Yup, we don’t need to mention what module actionToCall is in. This is because by default all our actions, mutations, and getters are located in the Global NameSpace
    // dispatch("actionToCall");

    // With namespaced = true !!!
    // If your action is inside of your current module
    // dispatch("actionToCall");
    // if the action I want to call is in another module
    // dispatch("moduleName/actionToCall", null, { root: true });

    return EventService.postEvent(event).then(() => {
      commit("ADD_EVENT", event);
    });
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit("SET_EVENTS_TOTAL", parseInt(response.headers["x-total-count"]));
        commit("SET_EVENTS", response.data);
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  },
  fetchEvent({ commit, getters }, id) {
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
};
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
