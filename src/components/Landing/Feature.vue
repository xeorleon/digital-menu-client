<template>
  <b-col md="4" class="mt-5">
    <div class="display-4 text-landing-primary mx-auto mb-4">
      <span :class="iconClass"></span>
    </div>
    <h5>{{ title }}</h5>
    <div class="custom-text-muted small">{{ description }}</div>
  </b-col>
</template>

<script>
export default {
  props: ["title", "description", "iconClass"],
};
</script>