<template>
  <v-dialog v-model="isOpen" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        elevation="1"
        fab
        dark
        color="cyan"
        v-bind="attrs"
        v-on="on"
        @click="handleCreateProductDialog"
      >
        <v-icon dark>
          {{ buttonIcon }}
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Product</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <form>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="value.name"
                  label="Product name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-select
                  v-model="value.currency"
                  :items="['BRL', 'USD']"
                  label="Currency*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="8" md="8">
                <v-text-field
                  v-model="value.price"
                  label="Price"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="value.description"
                  label="Product description*"
                ></v-textarea>
              </v-col>
            </v-row>
          </form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="handleCreateProductDialog()">
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="startSaving"
          :loading="isSaving"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createProduct, updateProduct } from '@/services/Product/Product'
export default {
  name: 'ProductForm',
  props: {
    value: {
      type: Object,
      required: false,
      default: () => ({
        name: 'Lorem ipsum dolor',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu faucibus nibh. Nam congue faucibus eros quis pellentesque.',
        currency: 'BRL',
        price: 10000
      })
    },
    buttonIcon: {
      type: String,
      default: 'mdi-plus'
    }
  },
  data: () => ({
    isOpen: false,
    isSaving: false
  }),
  methods: {
    handleCreateProductDialog () {
      this.isOpen = !this.isOpen
    },
    async startSaving () {
      this.isSaving = true
      await this.tryToSave()
      this.isSaving = false
      this.handleCreateProductDialog()
    },
    async tryToSave () {
      try {
        const product = await this.saveProduct(this.value)
        this.$emit('product', product)
      } catch (exception) {
        console.log(exception)
      }
    },
    saveProduct (product) {
      return product.id ? updateProduct(product) : createProduct(product)
    }
  }
}
</script>

<style></style>
