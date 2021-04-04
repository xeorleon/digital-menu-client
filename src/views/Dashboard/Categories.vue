<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-button v-b-modal.new-category variant="landing-secondary">Yeni Kategori</b-button>
      </b-col>
      <new-category-modal />
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
import NewCategoryModal from "../../components/Dashboard/Categories/NewCategoryModal.vue";
export default {
  components: { CategoriesTable, NewCategoryModal },

  mounted() {
    this.NewCategoryModal$title = "Categories";
  },
};
</script>