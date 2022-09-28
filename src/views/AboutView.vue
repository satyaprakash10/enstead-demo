<template>
  <main class="pb-4 mx-auto bg-white sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
    <section class="overflow-x-hidden hero">
      <Sliders />
    </section>
    <section
      class="container px-4 mx-auto my-12 bg-white md:my-20 md:px-8 population"
    >
      <Population />
    </section>
  </main>
</template>

<script setup lang="ts">
import Sliders from '../components/Sliders.vue'
import Population from '../components/Population/Index.vue'
</script>
