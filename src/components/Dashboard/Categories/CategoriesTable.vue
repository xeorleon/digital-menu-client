<template>
  <div>
    <b-table :items="items" :fields="fields" thead-class="table-header" bordered hover head-variant="dark" v-if="items.length > 0">
      <template #cell(nameTR)="row">{{ row.value }}</template>
      <template #cell(nameEN)="row">{{ row.value }}</template>
      <template #cell(actions)="row">
        <category-details-button v-on:categorySaved="refreshCategories" :category="row.item" />
        <b-button size="sm" variant="danger" @click="deleteCategory(row.item)" class="mr-1">Sil</b-button>
      </template>
    </b-table>
    <b-alert variant="warning" show v-else>Henüz kategori eklemediniz.</b-alert>
    <new-category-modal v-on:category-saved="refreshCategories" />
  </div>
</template>

<script>
import categoryService from "@/services/categoryService";
import NewCategoryModal from "@/components/Dashboard/Categories/NewCategoryModal.vue";
import CategoryDetailsButton from "@/components/Dashboard/Categories/CategoryDetailsButton.vue";

export default {
  components: { NewCategoryModal, CategoryDetailsButton },
  data() {
    return {
      items: [],
      fields: [
        { key: "nameTR", label: "Kategori Adı (TR)", sortable: true },
        { key: "nameEN", label: "Kategori Adı (EN)", sortable: true },
        { key: "actions", label: "Seçenekler", tdClass: "options-column", thClass: "options-column" },
      ],
    };
  },

  async mounted() {
    await this.fetchCategories();
  },

  methods: {
    deleteCategory(category) {
      this.$bvModal
        .msgBoxConfirm("Bu kategori ve kategoriye ait tüm ürünler silinecektir.", {
          title: "Emin misiniz?",
          centered: true,
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "EVET",
          cancelTitle: "HAYIR",
        })
        .then((value) => {
          if (value) {
            // category silme işlemleri
          }
        });
    },

    async refreshCategories() {
      await this.fetchCategories();
    },

    async fetchCategories() {
      const categoryData = await categoryService.getAllCategories(this.$store.state.user.userId);
      if (categoryData.code === 200) {
        this.items = categoryData.data;
      }
    },
  },
};
</script>

<style >
.options-column {
  width: 20%;
  text-align: center;
}

.table-header tr {
  border-color: var(--color-landing-secondary) !important;
}

.table-header tr th {
  background-color: var(--color-landing-secondary) !important;
  color: var(--color-white);
  border-color: var(--color-landing-secondary) !important;
}

.table-header tr th:focus {
  outline-color: var(--color-landing-secondary) !important;
}
</style>