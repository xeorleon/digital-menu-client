<template>
  <div class="d-inline">
    <b-button v-b-modal="this.category.id" size="sm" variant="info" class="mr-1">Düzenle</b-button>
    <category-details-modal v-on:categorySaved="handleCategorySave" :category="this.category" />
  </div>
</template>

<script>
import CategoryDetailsModal from "@/components/Dashboard/Categories/CategoryDetailsModal.vue";
export default {
  components: { CategoryDetailsModal },
  props: ["category"],

  methods: {
    handleCategorySave() {
      this.$emit("categorySaved");
    },
  },
};
</script>