<template>
  <div :class="className" class="layout-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      className: window.outerWidth < 768 ? "ml-50" : "ml-15",
    };
  },
  destroyed() {
    window.removeEventListener("resize", this.widthChanged);
  },
  mounted() {
    window.addEventListener("resize", this.widthChanged);
  },
  methods: {
    widthChanged(event) {
      this.className = event.target.outerWidth < 768 ? "ml-50" : "ml-15";
    },
  },
};
</script>


<style>
.layout-container {
  transition: margin 0.3s;
  padding: 40px 20px;
}
.ml-15 {
  margin-left: 15%;
}
.ml-50 {
  margin-left: 50px;
}
</style>