<template>
  <div class="fixed inset-x-0 top-0 z-50 bg-black">
    <div class="px-4 mx-auto max-w-7xl sm:px-6">
      <div
        class="flex items-center justify-between py-6 border-b-2 border-gray-100 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:w-0 md:flex-1 md:flex">
          <a href="#">
            <img class="w-auto h-8 sm:h-10" src="/demo.png" alt="" />
          </a>
        </div>
        <div class="-my-2 -mr-2 md:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-expanded="false"
            @click="openMenu"
          >
            <MenuIcon class="w-6 h-6" />
          </button>
        </div>
        <nav class="hidden space-x-10 md:flex md:flex-auto">
          <router-link
            to="/"
            class="flex items-center justify-center p-3 text-base font-medium text-white transition-all duration-500 ease-in-out rounded cursor-pointer hover:text-gray-400"
            >Home
          </router-link>
          <router-link
            to="/about"
            class="flex items-center justify-center p-3 text-base font-medium text-white transition-all duration-500 ease-in-out rounded cursor-pointer hover:text-gray-400"
            >About
          </router-link>
        </nav>
        <div
          class="items-center justify-end hidden transition-all duration-700 ease-in-out cursor-pointer md:absolute md:right-0 md:flex md:flex-1 lg:w-0"
        >
          <Searchbar
            @outlise-click-handle="
              (onClickOutside) => emit('outlise-click-handle', onClickOutside)
            "
          />
        </div>
      </div>
      <div
        v-show="isActiveMobileMenu"
        class="absolute inset-x-0 top-0 z-10 p-2 transition origin-top-right transform md:hidden"
      >
        <div
          class="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5"
        >
          <div class="flex items-center justify-between px-5 pt-4">
            <div>
              <img class="w-auto h-8" src="/demo.png" alt="" />
            </div>
            <div class="-mr-2">
              <button
                type="button"
                @click="closeMenu"
                class="inline-flex items-center justify-center p-2 text-gray-900 bg-white rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span class="sr-only">Close main menu</span>
                <IconClose class="w-6 h-6 text-gray-900" />
              </button>
            </div>
          </div>
          <div class="px-2 pt-5 pb-3 space-y-1">
            <router-link
              to="/"
              class="block px-3 py-2 text-base font-medium text-black transition-all duration-500 ease-in rounded-md cursor-pointer hover:bg-gray-50 hover:text-gray-400"
              >Home
            </router-link>
            <router-link
              to="/about"
              class="block px-3 py-2 text-base font-medium text-black transition-all duration-500 ease-in rounded-md cursor-pointer hover:bg-gray-50 hover:text-gray-400"
              >About
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Searchbar from '../../components/Searchbar.vue'
import IconClose from '../../components/icons/IconClose.vue'
import MenuIcon from '../../components/icons/IconMenu.vue'

const emit = defineEmits(['outlise-click-handle'])
const isActiveMobileMenu = ref(false)

function closeMenu() {
  isActiveMobileMenu.value = false
}
function openMenu() {
  isActiveMobileMenu.value = true
}
</script>

<style scoped>
.router-link-exact-active {
  background: gray;
  color: white;
}
</style>
