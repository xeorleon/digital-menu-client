<template>
  <div class="product">
    <div class="product-image">
      <b-img :src="product.imagePath" :alt="product.name" fluid />
    </div>
    <div class="product-details">
      <p class="name">{{ product.name }}</p>
      <p class="price">{{ product.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
};
</script>

<style>
.product {
  display: flex;
  flex-direction: row;
  height: 90px;
  margin-bottom: 15px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 0px 0px 3px 0px rgba(163, 164, 166, 1);
}

.product .product-image {
  width: 35%;
}

.product .product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.product .product-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  padding-top: 10px;
}

.product .product-details .price {
  font-size: 18px;
  font-weight: bold;
  color: var(--color-landing-primary);
}

.product .product-details .name {
  font-size: 14px;
  margin-bottom: 8px;
}
</style>