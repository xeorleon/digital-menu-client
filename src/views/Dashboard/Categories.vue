<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-button v-b-modal.new-category variant="landing-secondary">Yeni Kategori</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="12">
        <categories-table />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CategoriesTable from "@/components/Dashboard/Categories/CategoriesTable.vue";
export default {
  components: { CategoriesTable },

  mounted() {
    this.$title = "Categories";
  },
};
</script>