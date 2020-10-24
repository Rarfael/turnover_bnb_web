<template>
  <section>
    <v-row dense>
      <v-col v-for="product in products" :key="product.id" sm="12" xl="4" md="4">
        <Product
          :product="product"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { getProducts } from '@/services/Product/Product'
import Product from './Product'

export default {
  components: {
    Product
  },
  data: () => ({
    products: []
  }),
  mounted () {
    getProducts().then(products => {
      this.products = products
    })
  }
}
</script>

<style></style>
