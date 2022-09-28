<template>
  <div>
    <transition-child name="fade">
      <div
        class="fixed z-50 inset-0 flex justify-center delay-300~ bg-black/30 translate-all"
        v-show="isActive"
      >
        <div
          @click="onCloseSearch()"
          class="justify-center px-4 pt-16 mx-auto mt-20 sm:px-6 lg:px-8"
        >
          <div class="relative">
            <input
              type="text"
              v-model="search"
              @keypress="onSearch"
              @click.stop.prevent=""
              class="z-0 pr-8 text-black transition-all delay-200 rounded h-14"
              placeholder="Search anything..."
              :class="
                isActive
                  ? 'w-screen-75 pl-12 shadow outline-none '
                  : 'pl-5 w-10 '
              "
            />

            <div
              @click.stop.prevent="onUpdateSearch"
              class="absolute transition-all delay-150 left-3 top-4"
            >
              <IconSearch class="text-gray-500" />
            </div>
            <div
              @click.stop.prevent="onCloseSearch"
              class="absolute transition-all delay-150 top-4 right-3"
            >
              <IconPlus class="text-gray-900 rotate-45" />
            </div>
          </div>
        </div>
      </div>
      <div
        @click.stop.prevent="isActive = true"
        class="z-0 flex items-center justify-center p-4 sm:p-6"
      >
        <IconSearch class="text-white" />
      </div>
    </transition-child>
  </div>
</template>

<script setup lang="ts">
import IconSearch from './icons/IconSearch.vue'
import IconPlus from './icons/IconPlus.vue'
import { onMounted, ref } from 'vue'

const isActive = ref(false)
const search = ref(null)
const emit = defineEmits(['outlise-click-handle'])

function onSearch(e: any = null) {
  if (e?.which == 13) {
    console.log(search.value)
  } else if (!e && isActive.value) {
    console.log(search.value)
  }
}

onMounted(() => {
  emit('outlise-click-handle', onCloseSearch)
})

function onUpdateSearch() {
  onSearch()
  isActive.value = true
}
function onCloseSearch() {
  isActive.value = false
  search.value = null
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
</style>
