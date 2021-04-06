<template>
  <div>
    <b-table :items="products" :fields="fields" thead-class="table-header" bordered hover head-variant="dark" v-if="products.length > 0">
      <template #cell(nameTR)="row">{{ row.value }}</template>
      <template #cell(nameEN)="row">{{ row.value }}</template>
      <template #cell(actions)="row">
        <category-details-button v-on:categorySaved="refreshCategories" :category="row.item" />
        <b-button size="sm" variant="danger" @click="deleteCategory(row.item)" class="mr-1">Sil</b-button>
      </template>
    </b-table>
    <b-alert variant="warning" show v-else>Henüz kategori eklemediniz.</b-alert>
    <!-- <new-category-modal v-on:category-saved="refreshCategories" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      fields: [
        { key: "nameTR", label: "Ürün Adı (TR)", sortable: true },
        { key: "nameEN", label: "Ürün Adı (EN)", sortable: true },
        { key: "actions", label: "Seçenekler", tdClass: "options-column", thClass: "options-column" },
      ],
    };
  },
};
</script>