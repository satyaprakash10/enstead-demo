<template>
  <main class="mx-auto mt-16 lg:mt-20 xl:mt-28">
    <section class="overflow-x-hidden hero">
      <Sliders />
    </section>
    <section class="blogs">
      <Blogs />
    </section>
  </main>
</template>

<script setup lang="ts">
import Sliders from "../components/Sliders.vue";
import Blogs from "../components/Blogs.vue";
</script>
