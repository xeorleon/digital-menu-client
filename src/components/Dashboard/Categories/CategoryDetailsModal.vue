<template>
  <b-modal :id="this.categoryData.id" title="Detaylar" scrollable hide-footer>
    <form @submit.prevent="updateCategory" class="px-3" enctype="multipart/form-data">
      <b-form-group
        label="Kategori Adı (TR)"
        :state="validateState('nameTR')"
        :invalid-feedback="!$v.categoryData.nameTR.required ? 'Türkçe varsayılan dil olduğu için zorunludur.' : !$v.categoryData.nameTR.maxLength ? 'Kategori adı 50 karakterden uzun olamaz.' : ''"
      >
        <b-input v-model.trim="categoryData.nameTR" :state="validateState('nameTR')" />
      </b-form-group>
      <b-form-group label="Kategori Adı (EN)" :state="!categoryData.nameEN ? null : validateState('nameEN')" :invalid-feedback="!$v.categoryData.nameEN.maxLength ? 'Kategori adı 50 karakterden uzun olamaz.' : ''">
        <b-input v-model.trim="categoryData.nameEN" :state="!categoryData.nameEN ? null : validateState('nameEN')" />
      </b-form-group>
      <b-form-group label="Açıklama (TR)">
        <b-textarea rows="4" v-model.trim="categoryData.descriptionTR" />
      </b-form-group>
      <b-form-group label="Açıklama (EN)">
        <b-textarea rows="4" v-model.trim="categoryData.descriptionEN" />
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
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  props: ["category"],

  data() {
    return {
      categoryData: {
        id: this.category.id,
        nameTR: this.category.nameTR,
        nameEN: this.category.nameEN,
        descriptionTR: this.category.descriptionTR,
        descriptionEN: this.category.descriptionEN,
        imagePath: this.category.imagePath,
      },

      categoryModel: new FormData(),
    };
  },

  validations: {
    categoryData: {
      nameTR: {
        required,
        maxLength: maxLength(50),
      },
      nameEN: {
        maxLength: maxLength(50),
      },
    },
  },

  methods: {
    async updateCategory() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.categoryModel.append("Id", this.categoryData.id);
        this.categoryModel.append("NameTR", this.categoryData.nameTR);
        this.categoryModel.append("NameEN", this.categoryData.nameEN);
        this.categoryModel.append("DescriptionTR", this.categoryData.descriptionTR);
        this.categoryModel.append("DescriptionEN", this.categoryData.descriptionEN);

        const categoryData = await categoryService.updateCategory(this.$store.state.user.userId, this.categoryModel);
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
      }
    },

    validateState(name) {
      const { $dirty, $error } = this.$v.categoryData[name];
      return $dirty ? !$error : null;
    },

    closeModal() {
      this.categoryModel = new FormData();
      this.$v.$reset();
      this.$bvModal.hide(this.category.id);
    },

    imagePreview(event) {
      this.categoryModel.append("ImageFile", event, event.name);
      this.categoryData.imagePath = URL.createObjectURL(event);
    },
  },
};
</script>