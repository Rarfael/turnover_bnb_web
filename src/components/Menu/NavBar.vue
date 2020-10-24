<template>
  <v-app-bar app color="white" dark>
    <div class="d-flex align-center" color="primary">
      <h1 class="primary--text">Products</h1>
    </div>

    <v-spacer></v-spacer>
    <ProductForm @product="product => $emit('product', product)" class="pr-5" />
  </v-app-bar>
</template>

<script>
import ProductForm from '@/components/products/ProductForm'

export default {
  name: 'NavBar',
  components: { ProductForm }
}
</script>

<style></style>
