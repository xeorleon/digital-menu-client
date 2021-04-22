<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-button v-b-modal.new-product-group variant="landing-secondary">Yeni Ürün Grubu</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="12">
        <product-groups-table />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProductGroupsTable from "@/components/Dashboard/ProductGroups/ProductGroupsTable.vue";

export default {
  components: { ProductGroupsTable },

  mounted() {
    this.$title = "Product Groups";
  },
};
</script>

<style>
</style>