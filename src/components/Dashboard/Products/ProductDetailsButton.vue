<template>
  <div class="d-inline">
    <b-button v-b-modal="this.product.id" size="sm" variant="info" class="mr-1">Düzenle</b-button>
    <product-details-modal v-on:productUpdated="$emit('productUpdated')" :product="this.product" />
  </div>
</template>

<script>
import ProductDetailsModal from "./ProductDetailsModal.vue";
export default {
  components: { ProductDetailsModal },
  props: ["product"],
};
</script>