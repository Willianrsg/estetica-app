<template>
  <section class="mx-2">
    <h4>
      <i :class="`ps-1 me-2 ${icon} ` " v-if="icon"></i>
      {{ title }}
    </h4>
    <s-breadcumb v-if="breadcrumb"/>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    breadcrumb: Boolean,
    icon: String,
  },
}
</script>

<style></style>