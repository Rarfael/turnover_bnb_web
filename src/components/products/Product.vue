<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img height="250" :src="`https://picsum.photos/id/${value.id}/200/300`">
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-spacer></v-spacer>
        <v-btn color="secondary" elevation="1" icon @click="deleteItem">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-app-bar>
    </v-img>
    <v-card-title>{{ value.name }}</v-card-title>
    <v-card-text>
      <div class="subtitle-1">{{ value.currency }} {{ value.price / 100 }}</div>
      <div>
        {{ value.description }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="open">
        Open
      </v-btn>
      <v-spacer></v-spacer>
      <ProductForm buttonIcon="mdi-pencil" v-model="value" />
    </v-card-actions>
  </v-card>
</template>

<script>
import ProductForm from '@/components/products/ProductForm'
import { deleteProduct } from '@/services/Product/Product'

export default {
  components: { ProductForm },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    open () {
      this.$emit('open', this.value)
    },
    async deleteItem () {
      this.loading = true
      await deleteProduct(this.value.id)
      this.$emit('delete', this.value)
      this.loading = false
    }
  }
}
</script>

<style></style>
