<template>
  <b-modal id="new-category" title="Yeni Kategori" scrollable hide-footer>
    <form @submit.prevent="submitCategoryForm" class="px-3" enctype="multipart/form-data">
      <b-form-group label="Kategori Adı (TR)">
        <b-input v-model="category.name_tr" />
      </b-form-group>
      <b-form-group label="Kategori Adı (EN)">
        <b-input v-model="category.name_en" />
      </b-form-group>
      <b-form-group label="Kategori Görseli">
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
import categoryService from "@/services/categoryService";

export default {
  data() {
    return {
      category: {
        name_tr: "",
        name_en: "",
      },
      categoryModel: new FormData(),
      imageUrl: "",
    };
  },

  methods: {
    async submitCategoryForm() {
      if (this.validateCategoryForm()) {
        this.categoryModel.append("NameTR", this.category.name_tr);
        this.categoryModel.append("NameEN", this.category.name_en);

        const data = await categoryService.insertCategory(this.$store.state.user.userId, this.categoryModel);
        if (data.code === 200) {
          this.$emit("category-saved");
          this.$notify({
            group: "notify-top-right",
            text: "Kategori başarıyla kaydedildi.",
            duration: 5000,
            type: "success",
          });

          this.$bvModal.hide("new-category");

          this.category = {
            name_tr: "",
            name_en: "",
          };

          this.categoryModel = new FormData();
          this.imageUrl = "";
        }
      }
    },

    validateCategoryForm() {
      if (this.category.name_tr === "" || this.category.name_tr === null || this.category.name_tr === undefined) {
        this.$notify({
          group: "notify-top-right",
          text: "Türkçe varsayılan dil olduğu için boş bırakılamaz.",
          duration: 5000,
          type: "error",
        });

        return false;
      } else if (this.category.name_tr.length > 50 || this.category.name_en.length > 50) {
        this.$notify({
          group: "notify-top-right",
          text: "Kategori adı 50 karakterden uzun olamaz.",
          duration: 5000,
          type: "error",
        });

        return false;
      }

      return true;
    },

    closeModal() {
      this.$bvModal.hide("new-category");
    },

    imagePreview(event) {
      this.categoryModel.append("ImageFile", event, event.name);
      this.imageUrl = URL.createObjectURL(event);
    },
  },
};
</script>

<style>
</style>