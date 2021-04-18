<template>
  <div>
    <app-navbar :logo="this.logoPath" />
    <b-container>
      <category-swiper :categories="categories" :selectedCategoryId="selectedCategoryId" v-on:categorySwitched="switchCategory"/>
      <div class="selected-category-overview">
        <h6>{{ selectedCategoryName }}</h6>
      </div>
      <b-row>
        <b-col cols="12" md="4" v-for="product in products" :key="product.id" class="p-md-0 mr-md-3">
          <product :product="product" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import menuService from "@/services/menuService";
import AppNavbar from "@/components/Menu/Navbar.vue";
import Product from "@/components/Menu/Product.vue";
import CategorySwiper from "@/components/Menu/CategorySwiper.vue";

export default {
  components: { AppNavbar, Product, CategorySwiper },
  data() {
    return {
      categories: [],
      products: [],
      selectedCategoryId: "",
      selectedCategoryName: "",
      logoPath: null,
    };
  },

  async mounted() {
    const companySlug = this.$route.params.companySlug;
    const menu = await menuService.getMenu(companySlug);
    if (menu.code === 200) {
      this.categories = menu.data.categories;
      this.logoPath = menu.data.companyLogo || null;
      this.selectedCategoryId = this.categories[0].id;
      this.selectedCategoryName = this.categories[0].name;
      this.products = this.categories.find((category) => category.id === this.selectedCategoryId).products;
    }
  },

  methods: {
    switchCategory(categoryId) {
      this.selectedCategoryId = categoryId;
      const selectedCategory = this.categories.find((category) => category.id === this.selectedCategoryId);
      this.selectedCategoryName = selectedCategory.name;
      this.products = selectedCategory.products;
    },
  },
};
</script>