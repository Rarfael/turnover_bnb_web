<template>
  <section>
    <v-row dense>
      <v-col v-for="(product, index) in products" :key="product.id" sm="12" xl="4" md="4">
        <Product
          v-model="products[index]"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import Product from './Product'

export default {
  components: {
    Product
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<style></style>
