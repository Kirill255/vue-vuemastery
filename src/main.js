import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import BaseIcon from "@/components/BaseIcon";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);

// Global mixin
// Vue.mixin({
//   mounted() {
//     console.log("I am mixed into every component.");
//   }
// });

import "nprogress/nprogress.css";

Vue.component("BaseIcon", BaseIcon);

Vue.config.productionTip = false;

// Automatic Global Registration of Base Components
// https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});
//

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
