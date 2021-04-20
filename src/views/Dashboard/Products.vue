<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-button v-b-modal.new-product variant="landing-secondary">Yeni Ürün</b-button>
        <b-button v-b-modal.new-product-group variant="landing-secondary" class="ml-2">Yeni Ürün Grubu</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="12">
        <products-table />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProductsTable from "../../components/Dashboard/Products/ProductsTable.vue";
export default {
  components: { ProductsTable },
};
</script>

<style>
</style>