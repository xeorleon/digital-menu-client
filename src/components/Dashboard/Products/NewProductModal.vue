<template>
  <b-modal id="new-product" title="Yeni Ürün" scrollable hide-footer>
    <form @submit.prevent="submitProductForm" class="px-3" enctype="multipart/form-data">
      <b-form-group label="Ürün Adı (TR)">
        <b-input v-model.trim="product.nameTR" />
      </b-form-group>
      <b-form-group label="Ürün Adı (EN)">
        <b-input v-model.trim="product.nameEN" />
      </b-form-group>
      <b-form-group label="Ücret">
        <b-input v-model.trim="product.price" />
      </b-form-group>
      <b-form-group label="Kategori">
        <b-form-select v-model="product.categoryId" :options="categories" />
      </b-form-group>
      <b-form-group label="Açıklama (TR)">
        <b-textarea rows="4" v-model.trim="product.descriptionTR" />
      </b-form-group>
      <b-form-group label="Açıklama (EN)">
        <b-textarea rows="4" v-model.trim="product.descriptionEN" />
      </b-form-group>
      <b-form-group label="Ürün Görseli">
        <b-form-file @input="imagePreview" placeholder="Dosya Seç veya Sürükle" drop-placeholder="Buraya Bırak" accept="image/*" />
      </b-form-group>
      <b-form-group v-if="imageUrl">
        <img :src="imageUrl" class="image-preview" fluid />
      </b-form-group>
      <b-btn type="submit" variant="landing-secondary" class="mt-4">Kaydet</b-btn>
      <b-btn @click="closeModal" variant="danger" class="mt-4 ml-2">Vazgeç</b-btn>
    </form>
  </b-modal>
</template>

<script>
import productService from "@/services/productService";
import categoryService from "@/services/categoryService";

export default {
  data() {
    return {
      product: {
        nameTR: "",
        nameEN: "",
        descriptionTR: "",
        descriptionEN: "",
        price: 0.0,
        categoryId: null,
      },

      categories: [{ value: null, text: "--Seçiniz--" }],
      productModel: new FormData(),
      imageUrl: "",
      validationErrors: [],
    };
  },

  async mounted() {
    const categoryData = await categoryService.getAllCategories(this.$store.state.user.userId);
    if (categoryData.code === 200) {
      categoryData.data.map((category) => {
        this.categories.push({
          value: category.id,
          text: category.nameTR,
        });
      });
    }
  },

  methods: {
    async submitProductForm() {
      if (this.validateProductForm()) {
        this.productModel.append("NameTR", this.product.nameTR);
        this.productModel.append("NameEN", this.product.nameEN);
        this.productModel.append("DescriptionTR", this.product.descriptionTR);
        this.productModel.append("DescriptionEN", this.product.descriptionEN);
        this.productModel.append("Price", this.product.price);
        this.productModel.append("CategoryId", this.product.categoryId);

        const data = await productService.insertProduct(this.$store.state.user.userId, this.productModel);
        if (data.code === 200) {
          this.$emit("productSaved");
          this.$notify({
            group: "notify-top-right",
            text: "Ürün başarıyla kaydedildi.",
            duration: 5000,
            type: "success",
          });

          this.product = {
            nameTR: "",
            nameEN: "",
            descriptionTR: "",
            descriptionEN: "",
            price: 0.0,
            categoryId: null,
          };
          this.productModel = new FormData();
          this.imageUrl = "";
          this.$bvModal.hide("new-product");
        } else if (data.code === 400) {
          this.$notify({
            group: "notify-top-right",
            text: "Maksimum ürün sayısına ulaşıldı.",
            duration: 5000,
            type: "error",
          });
        }
      } else {
        this.validationErrors.map((error) => {
          this.$notify({
            group: "notify-top-right",
            text: error,
            duration: 5000,
            type: "error",
          });
        });

        this.validationErrors = [];
      }
    },

    imagePreview(event) {
      this.productModel.append("ImageFile", event, event.name);
      this.imageUrl = URL.createObjectURL(event);
    },

    validateProductForm() {
      if (!this.product.nameTR) this.validationErrors.push("Türkçe varsayılan dil olduğu için boş bırakılamaz.");
      if (this.product.nameTR.length > 50 || this.product.nameEN.length > 50) this.validationErrors.push("Ürün adı 50 karakterden uzun olamaz.");
      if (!this.product.categoryId) this.validationErrors.push("Kategori alanı boş bırakılamaz.");

      if (this.validationErrors.length > 0) return false;
      return true;
    },

    closeModal() {
      this.$bvModal.hide("new-product");
    },
  },
};
</script>

<style>
</style>