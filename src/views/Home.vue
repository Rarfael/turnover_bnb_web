<template>
  <section>
    <NavBar @product="pushNewProduc" />
    <Products :products="products" />
  </section>
</template>

<script>
import Products from '@/components/products/Producsts'
import NavBar from '@/components/Menu/NavBar'
import { getProducts } from '@/services/Product/Product'

export default {
  name: 'Home',
  components: { Products, NavBar },
  data: () => ({
    products: [],
    createNewProductDialogIsOpen: false,
    location: [
      {
        text: 'Home',
        href: '/'
      }
    ]
  }),
  mounted () {
    getProducts().then(products => {
      this.products = products
    })
  },
  methods: {
    pushNewProduc (product) {
      this.products = this.products.concat(product)
    }
  }
}
</script>

<style></style>
