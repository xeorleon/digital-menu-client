<template>
  <div>
    <b-table :items="products" :fields="fields" thead-class="table-header" bordered hover head-variant="dark" v-if="products.length > 0" class="dashboard-table">
      <template #cell(nameTR)="row">{{ row.value }}</template>
      <template #cell(nameEN)="row">{{ row.value }}</template>
      <template #cell(price)="row">{{ row.value }}</template>
      <template #cell(actions)="row">
        <product-details-button v-on:productSaved="refreshProducts" :product="row.item" />
        <b-button size="sm" variant="danger" @click="deleteProduct(row.item)" class="mr-1">Sil</b-button>
      </template>
    </b-table>
    <b-alert variant="warning" show v-else>Henüz ürün eklemediniz.</b-alert>
    <new-product-modal v-on:productSaved="refreshProducts" />
  </div>
</template>

<script>
import NewProductModal from "@/components/Dashboard/Products/NewProductModal.vue";
import ProductDetailsButton from "@/components/Dashboard/Products/ProductDetailsButton.vue";
import productService from "@/services/productService";
export default {
  components: { NewProductModal, ProductDetailsButton },
  data() {
    return {
      products: [],
      fields: [
        { key: "nameTR", label: "Ürün Adı (TR)", sortable: true },
        { key: "nameEN", label: "Ürün Adı (EN)", sortable: true },
        { key: "price", label: "Fiyat", sortable: true },
        { key: "actions", label: "Seçenekler", tdClass: "options-column", thClass: "options-column" },
      ],
    };
  },

  async mounted() {
    await this.fetchProducts();
  },

  methods: {
    async fetchProducts() {
      const data = await productService.getAllProducts(this.$store.state.user.userId);
      if (data.code === 200) {
        this.products = data.data;
      }
    },

    async refreshProducts() {
      await this.fetchProducts();
    },
  },

  deleteProduct(product) {},
};
</script>