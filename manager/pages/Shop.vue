<template lang="pug">
  v-flex
    v-toolbar(flat)
      v-spacer
</template>

<script>
// Components
import ShopToolbar from '../components/ShopToolbar';

export default {
  name: 'ShopPage',

  metaInfo() {
    return {
      title: `${this.d.orders || 'Orders'}`
    };
  },

  components: {
    ShopToolbar
  }
};
</script>
