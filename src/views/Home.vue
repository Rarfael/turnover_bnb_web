<template>
  <section>
    <NavBar @product="pushNewProduc" />
    <DateFilter @products="showProducts" />
    <Products :products="products" @delete="removeProductFromArray"/>
  </section>
</template>

<script>
import Products from '@/components/products/Producsts'
import NavBar from '@/components/Menu/NavBar'
import DateFilter from '@/components/products/DateFilter'
import { getProducts } from '@/services/Product/Product'

export default {
  name: 'Home',
  components: { Products, NavBar, DateFilter },
  data: () => ({
    products: [],
    createNewProductDialogIsOpen: false
  }),
  mounted () {
    getProducts().then(products => {
      this.products = products
    })
  },
  methods: {
    pushNewProduc (product) {
      this.products = this.products.concat(product)
    },
    removeProductFromArray (item) {
      this.products = this.products.filter((product) => product.id !== item.id)
    },
    showProducts (products) {
      this.products = products
    }
  }
}
</script>

<style></style>
