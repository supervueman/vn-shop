<template lang="pug">
  v-card(outlined)
    v-card-text
      //- div(v-for="(field, i) in fields" :key="i + 11") {{field}}
      //-   br
      //-   br

      //- div Additional fields
      //- div(v-for="(field, i) in additionalFields" :key="i + 11") {{field}}
      //-   br
      //-   br
      v-flex.mb-4
      v-flex.md12(v-for="(field, i) in fields" :key="i")
        v-layout.mb-4
          //- Text field
          v-flex(v-if="field.interface.fieldType === 'text'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-text-field(
              v-model="field.value"
            )

          //- Textarea field
          v-flex(v-else-if="field.interface.fieldType === 'textarea'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-textarea(
              v-model="field.value"
            )

          //- Editor field
          v-flex(v-else-if="field.interface.fieldType === 'editor'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div.mb-3(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            editor(
              :content="field.value"
              @update="field.value = $event"
            )

          //- Image field
          v-flex.md6(v-else-if="field.interface.fieldType === 'image'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div.mb-3(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            image-field(
              v-model="field.value"
              @selectFile="field.value = $event"
              @input="field.value = $event"
            )

          //- Select field
          v-flex(v-else-if="field.interface.fieldType === 'select'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-select(
              :items="field.interface.defaultValue"
              v-model="field.value"
            )
          
          //- Multiple select
          v-flex(v-else-if="field.interface.fieldType === 'multiselect'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-select(
              v-model="field.value"
              :items="field.interface.defaultValue"
              multiple
              chips
              persistent-hint
            )

          //- Migx field
          v-flex(v-else-if="field.interface.fieldType === 'migx'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            migx-field(
              :field="field.value"
              :schema="field.interface.shema"
              @create="field.value.push($event)"
              @update="field.value[$event.index] = $event.item"
              @remove="field.value.splice($event, 1)"
            )

          //- Date field
          v-flex(v-else-if="field.interface.fieldType === 'date'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-menu(
              ref="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            )
              template(v-slot:activator="{ on }")
                v-text-field(
                  v-model="field.value"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                )
              v-date-picker(
                v-model="field.value"
                no-title
                scrollable
                color="primary"
              )

          //- Time field
          v-flex(v-else-if="field.interface.fieldType === 'time'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-menu(
              ref="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            )
              template(v-slot:activator="{ on }")
                v-text-field(
                  v-model="field.value"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                )
              v-time-picker(
                format="24hr"
                v-model="field.value"
              )

          //- Checkbox field
          v-flex(v-else-if="field.interface.fieldType === 'checkbox'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-checkbox(
              color="primary"
              v-model="field.value"
            )

          //- Colorpicker field
          v-flex(v-else-if="field.interface.fieldType === 'colorpicker'")
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-color-picker(
              v-model="field.value"
            )

          //- Radio field
          v-flex(v-else-if="field.interface.fieldType === 'radio'") {{field.inteface}}
            v-tooltip(left)
              template(v-slot:activator="{ on }")
                div(v-on="on") {{field.interface.title}}
              span {{field.interface.slug}}
            v-radio-group(
              v-model="field.value"
              :mandatory="false"
            )
              v-radio(
                v-for="item in field.interface.defaultValue"
                :key="item"
                :label="item"
                :value="item"
              )
    v-card-actions.px-4.pb-4
      v-btn(
        color="primary"
        @click="saveAdditionalFields"
        depressed
        v-if="r.is_product_update"
      ) {{d.save || 'Save'}}
</template>

<script>
// Components
import MigxField from '../../../../core/modules/field/components/Migx/MigxField';

export default {
  name: 'ProductFields',

  components: {
    MigxField
  },

  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    additionalFields() {
      return this.$store.getters['shop/product/getAdditionalFields'];
    },
    fields() {
      return this.$store.getters['shop/product/getSerializedFields'];
    }
  },

  async mounted() {
    await this.$store.dispatch('fieldcategory/findAll', {
      query: {
        filter: {
          order: [['createdAt', 'DESC']]
        }
      }
    });
  },

  methods: {
    async saveAdditionalFields() {
      if (!this.r.is_product_update) {
        return;
      }
      const fields = [];

      for (let el in this.fields) {
        if (this.fields[el].id) {
          const updateField = {
            id: this.fields[el].id,
            slug: el,
            value: this.fields[el].value,
            productId: this.fields[el].productId,
            fieldId: this.fields[el].interface.id,
            categoryId: this.fields[el].interface.categoryId
          };
          if (this.fields[el].interface.fieldType === 'migx') {
            updateField.value = JSON.stringify(this.fields[el].value);
          }
          if (this.fields[el].interface.fieldType === 'multiselect') {
            updateField.value = JSON.stringify(this.fields[el].value);
          }
          fields.push(updateField);
        } else {
          const createField = {
            slug: el,
            value: this.fields[el].value,
            productId: this.fields[el].productId,
            fieldId: this.fields[el].interface.id,
            categoryId: this.fields[el].interface.categoryId
          };

          if (this.fields[el].interface.fieldType === 'migx') {
            createField.value = JSON.stringify(this.fields[el].value);
          }
          if (this.fields[el].interface.fieldType === 'multiselect') {
            createField.value = JSON.stringify(this.fields[el].value);
          }
          fields.push(createField);
        }
      }

      for await (let el of fields) {
        if (el.id) {
          await this.$store.dispatch('shop/productfield/update', {
            params: {
              id: el.id
            },
            body: el
          });
        } else {
          await this.$store.dispatch('shop/productfield/create', el);
        }
      }

      await this.$store.dispatch('shop/product/findByPk', {
        params: {
          id: this.$route.params.id
        },
        query: {
          filter: {
            include: [
              {
                association: 'layout',
                include: ['fields']
              },
              'productfields',
              'translations',
              'resourcetype'
            ]
          }
        }
      });
    },

    async filterFields(event) {
      const query = {
        filter: {
          include: [
            {
              association: 'layout',
              include: [
                {
                  association: 'fields',
                  where: { categoryId: event }
                }
              ]
            },
            {
              association: 'productfields',
              where: { categoryId: event }
            },
            {
              association: 'parent',
              include: ['translations']
            },
            'translations',
            'resourcetype'
          ]
        }
      };
      if (this.product.additionalfields.length === 0) {
        delete query.filter.include[1].where;
      }
      await this.$store.dispatch('shop/product/findByPk', {
        params: {
          id: this.$route.params.id
        },
        query
      });
    }
  }
};
</script>
