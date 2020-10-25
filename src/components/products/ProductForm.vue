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
                  :rules="nameErrors"
                  label="Product name*"
                  @input="$v.value.name.$touch()"
                  @blur="$v.value.name.$touch()"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-select
                  v-model="value.currency"
                  :rules="currencyErrors"
                  :items="['BRL', 'USD']"
                  label="Currency*"
                  @input="$v.value.currency.$touch()"
                  @blur="$v.value.currency.$touch()"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="8" md="8">
                <v-text-field
                  v-model="value.price"
                  :rules="priceErrors"
                  label="Price"
                  type="number"
                  required
                  @input="$v.value.price.$touch()"
                  @blur="$v.value.price.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="value.description"
                  label="Product description*"
                  :rules="descriptionErrors"
                  @input="$v.value.description.$touch()"
                  @blur="$v.value.description.$touch()"
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
          :disabled="this.$v.$anyError || this.$v.$invalid"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { createProduct, updateProduct } from '@/services/Product/Product'
import {
  required,
  minLength,
  maxLength,
  minValue
} from 'vuelidate/lib/validators'

export default {
  name: 'ProductForm',
  mixins: [validationMixin],
  validations: {
    value: {
      name: { required, minLength: minLength(2), maxLength: maxLength(30) },
      description: { required, maxLength: maxLength(100) },
      currency: { required },
      price: { required, minValue: minValue(1) }
    }
  },
  props: {
    value: {
      type: Object,
      required: false,
      default: () => ({})
    },
    buttonIcon: {
      type: String,
      default: 'mdi-plus'
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.value.name.$dirty) return errors
      !this.$v.value.name.minLength &&
        errors.push('Name must have at least 2 characters')
      !this.$v.value.name.required && errors.push('Name is required.')
      !this.$v.value.name.maxLength &&
        errors.push('No more than 30 characters are allowed')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.value.name.$dirty) return errors
      !this.$v.value.description.required && errors.push('Description is required.')
      !this.$v.value.description.maxLength && errors.push('No more than 255 characters are allowed')
      return errors
    },
    currencyErrors () {
      const errors = []
      if (!this.$v.value.currency.$dirty) return errors
      !this.$v.value.currency.required && errors.push('Currency is required.')
      return errors
    },
    priceErrors () {
      const errors = []
      if (!this.$v.value.price.$dirty) return errors
      !this.$v.value.price.required && errors.push('Price is required.')
      return errors
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
