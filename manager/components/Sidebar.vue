<template>
  <v-navigation-drawer
    v-model="drawer"
    width="320"
    :hide-overlay="true"
    fixed
    app
    mobile-breakpoint="600"
    stateless
    manual-scroll
  >
    <v-app-bar
      class="primary"
      dark
      flat
    >
      <router-link to="/">
        <!-- <v-img
          src="/static/dev-logo.svg"
          class="toolbar-logo mr-4"
          max-width="40px"
        /> -->
      </router-link>
    </v-app-bar>
    <products-tab />
  </v-navigation-drawer>
</template>

<script>
// Components
import ProductsTab from "./Sidebar/ProductsTab";

export default {
  name: "Sidebar",

  components: {
    ProductsTab
  },

  data() {
    return {
      drawer: true,
      active: null
    };
  }
};
</script>
