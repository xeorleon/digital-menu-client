<template>
  <b-modal id="new-category" title="Yeni Kategori" scrollable hide-footer>
    <form @submit.prevent="submitCategoryForm" class="px-3" enctype="multipart/form-data">
      <b-form-group
        label="Kategori Adı (TR)"
        :state="validateState('name_tr')"
        :invalid-feedback="!$v.category.name_tr.required ? 'Türkçe varsayılan dil olduğu için zorunludur.' : !$v.category.name_tr.maxLength ? 'Kategori adı 50 karakterden uzun olamaz.' : ''"
      >
        <b-input v-model="category.name_tr" :state="validateState('name_tr')" />
      </b-form-group>
      <b-form-group label="Kategori Adı (EN)" :state="!category.name_en ? null : validateState('name_en')" :invalid-feedback="!$v.category.name_tr.maxLength ? 'Kategori adı 50 karakterden uzun olamaz.' : ''">
        <b-input v-model="category.name_en" :state="!category.name_en ? null : validateState('name_en')" />
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
import { required, maxLength } from "vuelidate/lib/validators";

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

  validations: {
    category: {
      name_tr: {
        required,
        maxLength: maxLength(50),
      },
      name_en: {
        maxLength: maxLength(50),
      },
    },
  },

  methods: {
    async submitCategoryForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
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

          this.category = {
            name_tr: "",
            name_en: "",
          };
          this.categoryModel = new FormData();
          this.imageUrl = "";
          this.$bvModal.hide("new-category");
        }
      }
    },

    validateState(name) {
      const { $dirty, $error } = this.$v.category[name];
      return $dirty ? !$error : null;
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
