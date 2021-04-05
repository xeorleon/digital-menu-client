<template>
  <b-modal :id="this.categoryData.id" title="Detaylar" scrollable hide-footer>
    <form @submit.prevent="updateCategory" class="px-3" enctype="multipart/form-data">
      <b-form-group label="Kategori Adı (TR)">
        <b-input v-model="categoryData.nameTR" />
      </b-form-group>
      <b-form-group label="Kategori Adı (EN)">
        <b-input v-model="categoryData.nameEN" />
      </b-form-group>
      <b-form-group label="Kategori Görseli">
        <b-form-file @input="imagePreview" placeholder="Dosya Seç veya Sürükle" drop-placeholder="Buraya Bırak" accept="image/*" />
      </b-form-group>
      <b-form-group v-if="categoryData.imagePath">
        <img :src="this.categoryData.imagePath" class="image-preview" fluid />
      </b-form-group>
      <b-btn type="submit" variant="landing-secondary" class="mt-4">Kaydet</b-btn>
      <b-btn variant="danger" @click="closeModal" class="mt-4 ml-2">Vazgeç</b-btn>
    </form>
  </b-modal>
</template>

<script>
import categoryService from "@/services/categoryService";

export default {
  props: ["category"],

  data() {
    return {
      categoryData: {
        id: this.category.id,
        nameTR: this.category.nameTR,
        nameEN: this.category.nameEN,
        imagePath: this.category.imagePath,
      },

      categoryModel: new FormData(),
    };
  },

  methods: {
    async updateCategory() {
      this.categoryModel.append("Id", this.categoryData.id);
      this.categoryModel.append("NameTR", this.categoryData.nameTR);
      this.categoryModel.append("NameEN", this.categoryData.nameEN);
      
      var categoryData = await categoryService.updateCategory(this.$store.state.user.userId, this.categoryModel);
      if (categoryData.code === 200) {
        this.$emit("categorySaved");
        this.$notify({
          group: "notify-top-right",
          text: "Kategori başarıyla güncellendi.",
          duration: 5000,
          type: "success",
        });

        this.categoryModel = new FormData();
        this.closeModal();
      }
    },

    closeModal() {
      this.$bvModal.hide(this.category.id);
    },

    imagePreview(event) {
      this.categoryModel.append("ImageFile", event, event.name);
      this.categoryData.imagePath = URL.createObjectURL(event);
    },
  },
};
</script>