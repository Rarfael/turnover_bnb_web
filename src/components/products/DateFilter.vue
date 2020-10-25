<template>
  <section>
    <v-form>
      <v-container>
        <v-form> </v-form>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="startDate"
              label="Start date time"
              type="datetime-local"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="endDate"
              label="End date time"
              type="datetime-local"
            ></v-text-field>
          </v-col>
          <v-btn @click="search" icon large :loading="loading">
            <v-icon>mdi-magnify </v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </section>
</template>

<script>
import { searchBetweenDateTime } from '@/services/Product/Product'
export default {
  name: 'DateFilter',
  data: () => ({
    loading: false,
    startDate: '',
    endDate: ''
  }),
  methods: {
    async search () {
      this.loading = true
      const products = await searchBetweenDateTime(this.startDate, this.endDate)
      this.loading = false
      this.$emit('products', products)
    }
  }
}
</script>

<style></style>
