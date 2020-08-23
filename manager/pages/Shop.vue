<template>
  <VFlex>
    <VToolbar flat>
      <VSpacer />
    </VToolbar>
  </VFlex>
</template>

<script>
export default {
  name: 'ShopPage',

  metaInfo() {
    return {
      title: `${this.d.orders || 'Orders'}`
    };
  }
};
</script>
