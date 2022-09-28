<template>
  <div class="rounded">
    <button
      @click="toggleAccordion()"
      class="flex items-center justify-between w-full px-4 py-6 space-x-3"
      :aria-expanded="isOpen"
      :aria-controls="`collapse${_uid}`"
    >
      <slot name="title" />

      <IconPlus
        class="w-3 transition-all duration-200 transform"
        :class="{
          'rotate-180': isOpen,
          'rotate-0': !isOpen,
        }"
        v-show="!isOpen"
      />
      <IconMinus
        class="w-3 transition-all duration-200 transform"
        :class="{
          'rotate-180': isOpen,
          'rotate-0': isOpen,
        }"
        v-show="isOpen"
      />
    </button>

    <div
      v-show="isOpen"
      class="p-4 transition-all delay-200"
      :id="`collapse${_uid}`"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconPlus from "./icons/IconPlus.vue";
import IconMinus from "./icons/IconMinus.vue";

import { ref, watchEffect } from "vue";
const props = defineProps(["active-index", "current-index"]);

const emit = defineEmits(["on-change-accordion"]);

const isOpen = ref(false);
const _uid = ref(Math.random());

watchEffect(() => {
  if (props.activeIndex != props.currentIndex) {
    isOpen.value = false;
  }
});

function toggleAccordion() {
  isOpen.value = !isOpen.value;
  emit("on-change-accordion", true);
}
</script>
