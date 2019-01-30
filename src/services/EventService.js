import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3004`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000 // throw error if API call takes longer than 10 sec
});

export default {
  // https://github.com/typicode/json-server#paginate
  // So if we construct a URL like so: /events?_limit=3&_page=2 our API will return 3 events per page, and will give us the events to list on page 2.
  getEvents(perPage, page) {
    return apiClient.get("/events?_limit=" + perPage + "&_page=" + page);
  },
  getEvent(id) {
    return apiClient.get("/events/" + id);
  },
  postEvent(event) {
    return apiClient.post("/events", event);
  }
};
