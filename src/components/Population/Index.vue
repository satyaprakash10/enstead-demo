<template>
  <div class="mx-auto">
    <div class="flex items-center justify-between">
      <h1
        class="my-10 text-3xl font-semibold text-gray-900 md:text-4xl lg:text-5xl"
      >
        Population
      </h1>
      <div class="flex">
        <IconDown
          @click="sorting(1)"
          class="w-16 h-10 mx-2 text-gray-900 bg-gray-300 cursor-pointer"
        />
        <IconUp
          @click="sorting(0)"
          class="w-16 h-10 mx-2 text-gray-900 transition-all ease-in-out bg-gray-300 cursor-pointer duration-400"
        />
        <select
          name="year"
          style="color: black"
          v-model="year"
          class="block w-full h-10 px-3 py-2 text-black bg-gray-300 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="all">All</option>
          <option v-for="(val, k) in range(30, 2001)" :key="k" :value="val">
            {{ val }}
          </option>
        </select>
      </div>
    </div>
    <div v-show="!isLoading" class="">
      <accordion
        v-for="(population, index) in updatedPopulations"
        :key="index"
        :active-index="activeIndex"
        :current-index="index"
        @on-change-accordion="() => onChangeAccordion(index)"
        class="mb-4 text-white shadow-sm hover:shadow-lg"
        :class="isOdd(index) ? 'bg-gray-500' : 'bg-gray-400'"
      >
        <template v-slot:title>
          <span class="text-xl font-semibold">{{ population['Year'] }}</span>
        </template>
        <template v-slot:content>
          <div class="grid grid-cols-3">
            <div class="flex flex-col">
              <h3 class="text-xl font-semibold">Country</h3>
              <p>{{ population['Nation'] }}</p>
            </div>
            <div class="flex flex-col text-center">
              <h3 class="text-xl font-semibold">Population</h3>
              <p>{{ population['Population'] }}</p>
            </div>
            <div class="flex flex-col text-right">
              <h3 class="text-xl font-semibold">Source</h3>
              <p>{{ source }}</p>
            </div>
          </div>
        </template>
      </accordion>
    </div>
    <button
      v-if="isShowMore"
      @click="showMore()"
      class="inline-flex justify-center px-4 py-2 mb-6 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Show More
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import IconUp from '../icons/IconUpArrow.vue'
import IconDown from '../icons/IconArrowDown.vue'
import Accordion from '../Accordion.vue'
import axios from 'axios'

const isShortUp = ref(false)
const populations = ref(null)
const source = ref(null)
const count = ref(1)
const isShowMore = ref(false)
const isLoading = ref(false)
const year = ref('all')
const activeIndex = ref(null)

onMounted(() => {
  getPopulation()
})

const updatedPopulations = computed(() => {
  isLoading.value = true
  let data = populations.value

  let updatedData = data?.slice(0, count.value * 4)
  if (isShortUp.value) {
    updatedData = updatedData?.sort((first: any, second: any) => {
      return first.Year - second.Year
    })
  } else {
    updatedData = updatedData?.sort(
      (first: any, second: any) => second.Year - first.Year
    )
  }
  if (year.value != 'all') {
    updatedData = updatedData?.filter((_v) => _v.Year == year.value)
  }
  isLoading.value = false

  if (updatedData?.length <= 0) {
    isShowMore.value = false
  }

  return updatedData
})

function isOdd(val: any) {
  return val % 2 == 0
}

function onChangeAccordion(index: any) {
  activeIndex.value = index
}

function showMore() {
  if (isShowMore.value) {
    let data = populations.value
    let length = Math.floor(data.length / 4)
    if (count.value < length) {
      count.value = length + 1
    }
    if (length <= count.value) {
      isShowMore.value = false
    }
  }
}

function range(size: Number, startAt: any = 0) {
  return [...Array(size).keys()].map((i) => i + startAt)
}

function sorting(order: Number) {
  isShortUp.value = order >= 1 ? true : false
}

async function getPopulation() {
  try {
    const response = await axios.get(
      'https://datausa.io/api/data?drilldowns=Nation&measures=Population'
    )

    populations.value = response.data.data
    let data = populations.value
    let length = Math.floor(data.length / 4)
    if (length > 1) {
      isShowMore.value = true
    }
    source.value = response.data.source?.[0]?.annotations?.source_name
  } catch (error) {
    console.error(error)
  }
}
</script>
