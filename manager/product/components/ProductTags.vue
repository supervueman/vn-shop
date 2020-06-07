<template lang="pug">
	v-card(outlined)
		v-card-text
			v-select(
				v-model="tag"
				:items="tags"
				:label="d.select_tag || 'Select tag'"
				item-text="title"
				item-value="id"
				@change="selectTag"
			)
		v-card-text
			v-layout
				v-chip.mr-1(
					v-for="tag in product.tags"
					:key="tag.slug"
					close
					color="primary"
					close-icon="mdi-delete"
					@click:close="removeTag(tag.id)"
				) {{tag.title}}
</template>

<script>
export default {
  name: "ProductTagsConpponent",

  data: () => ({
    tag: null
  }),

  computed: {
    tags() {
      return this.$store.getters["tag/getAll"];
    },

    product() {
      return this.$store.getters["shop/product/get"];
    }
  },

  methods: {
    async selectTag(id) {
      const tag = this.tags.find(el => el.id === id);
      if (!this.product.tags.find(el => el.id === tag.id)) {
        this.product.tags.push(this.tags.find(el => el.id === id));

        await this.$store.dispatch("shop/product/addTag", {
          body: [[this.product.id, id]]
        });
      }
    },

    async removeTag(id) {
      const tag = this.tags.find(el => el.id === id);
      if (tag) {
        this.product.tags = this.product.tags.filter(el => el.id !== id);
        await this.$store.dispatch("shop/product/removeTag", {
          body: [[this.product.id, id]]
        });
      }
    }
  }
};
</script>
