<template>
  <b-modal :id="this.productData.id" title="Detaylar" scrollable hide-footer>
    <form @submit.prevent="updateProduct" class="px-3" enctype="multipart/form-data">
      <b-form-group
        label="Ürün Adı (TR)"
        :state="validateState('nameTR')"
        :invalid-feedback="!$v.productData.nameTR.required ? 'Türkçe varsayılan dil olduğu için zorunludur.' : !$v.productData.nameTR.maxLength ? 'Ürün adı 50 karakterden uzun olamaz.' : ''"
      >
        <b-input v-model.trim="productData.nameTR" :state="validateState('nameTR')" />
      </b-form-group>
      <b-form-group label="Ürün Adı (EN)" :state="!productData.nameEN ? null : validateState('nameEN')" :invalid-feedback="!$v.productData.nameTR.maxLength ? 'Ürün adı 50 karakterden uzun olamaz.' : ''">
        <b-input v-model.trim="productData.nameEN" :state="!productData.nameEN ? null : validateState('nameEN')" />
      </b-form-group>
      <b-form-group label="Ücret" :state="validateState('price')" :invalid-feedback="!$v.productData.price.required ? 'Fiyat alanı zorunludur.' : ''">
        <b-input v-model.trim="productData.price" :state="validateState('price')" />
      </b-form-group>
      <b-form-group label="Kategori" :state="validateState('categoryId')" :invalid-feedback="!$v.productData.categoryId.required ? 'Kategori seçiniz.' : ''">
        <b-form-select v-model="productData.categoryId" :options="categories" :state="validateState('categoryId')" />
      </b-form-group>
      <b-form-group label="Açıklama (TR)">
        <b-textarea rows="4" v-model.trim="productData.descriptionTR" />
      </b-form-group>
      <b-form-group label="Açıklama (EN)">
        <b-textarea rows="4" v-model.trim="productData.descriptionEN" />
      </b-form-group>
      <b-form-group label="Ürün Görseli">
        <b-form-file @input="imagePreview" placeholder="Dosya Seç veya Sürükle" drop-placeholder="Buraya Bırak" accept="image/*" />
      </b-form-group>
      <b-form-group v-if="productData.imagePath">
        <img :src="productData.imagePath" class="image-preview" fluid />
      </b-form-group>
      <b-btn type="submit" variant="landing-secondary" class="mt-4">Kaydet</b-btn>
      <b-btn @click="closeModal" variant="danger" class="mt-4 ml-2">Vazgeç</b-btn>
    </form>
  </b-modal>
</template>

<script>
import categoryService from "@/services/categoryService";
import productService from "@/services/productService";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  props: ["product"],

  data() {
    return {
      productData: {
        id: this.product.id,
        price: this.product.price,
        nameTR: this.product.nameTR,
        nameEN: this.product.nameEN,
        descriptionTR: this.product.descriptionTR,
        descriptionEN: this.product.descriptionEN,
        imagePath: this.product.imagePath,
        categoryId: this.product.categoryId,
      },

      categories: [],
      productModel: new FormData(),
    };
  },

  validations: {
    productData: {
      nameTR: {
        required,
        maxLength: maxLength(50),
      },
      nameEN: {
        maxLength: maxLength(50),
      },
      price: {
        required,
      },
      categoryId: {
        required,
      },
    },
  },

  methods: {
    async updateProduct() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.productModel.append("Id", this.productData.id);
        this.productModel.append("Price", this.productData.price);
        this.productModel.append("NameTR", this.productData.nameTR);
        this.productModel.append("NameEN", this.productData.nameEN);
        this.productModel.append("DescriptionTR", this.productData.descriptionTR);
        this.productModel.append("DescriptionEN", this.productData.descriptionEN);
        this.productModel.append("CategoryId", this.productData.categoryId);

        const productData = await productService.updateProduct(this.$store.state.user.userId, this.productModel);
        if (productData.code === 200) {
          this.$notify({
            group: "notify-top-right",
            text: "Ürün başarıyla güncellendi.",
            duration: 5000,
            type: "success",
          });

          this.productModel = new FormData();
          this.closeModal();
          this.$v.$reset();
          this.$emit("productUpdated");
        }
      }
    },

    validateState(name) {
      const { $dirty, $error } = this.$v.productData[name];
      return $dirty ? !$error : null;
    },

    imagePreview(event) {
      this.productModel.append("ImageFile", event, event.name);
      this.productData.imagePath = URL.createObjectURL(event);
    },

    closeModal() {
      this.$bvModal.hide(this.product.id);
    },
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
};
</script>

<style>
</style>