<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img
      height="250"
      :src="`https://picsum.photos/id/${product.id}/200/300`"
    ></v-img>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-text>
      <div class="subtitle-1">
        {{ product.currency }} {{ product.price / 100 }}
      </div>
      <div>
        {{ product.description }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="edit">
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    edit () {
      this.$emit('edit', this.product.id)
    }
  }
}
</script>

<style></style>
