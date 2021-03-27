<template>
  <b-col md="4" class="my-4">
    <div class="text-success mx-auto mb-4">
      <span class="ui-icon font-weight-bolder">
        <i :class="iconClass"></i>
      </span>
    </div>
    <h5>{{ title }}</h5>
    <div class="custom-text-muted small">{{ description }}</div>
  </b-col>
</template>

<script>
export default {
  props: ["iconClass", "title", "description"],
};
</script>

<style>
.ui-icon {
  display: inline-block;
  width: 46px;
  height: 46px;
  border: 1px solid;
  border-radius: 50%;
  vertical-align: middle;
  text-align: center;
  font-size: 18px;
  line-height: calc(46px - 4px);
}

.ui-icon i {
  font-weight: bold;
}
</style>
