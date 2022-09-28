<template>
  <div class="w-full slider-content slider-display-container h-128">
    <div class="absolute w-screen transition-all delay-200 home-slide h-128">
      <img class="w-screen h-128" src="/banner4-min.jpg" />
    </div>
    <div class="absolute w-screen transition-all delay-200 home-slide h-128">
      <img class="w-screen h-128" src="/banner1-min.jpg" />
    </div>
    <div class="absolute w-screen transition-all delay-200 home-slide h-128">
      <img class="w-screen h-128" src="/banner3-min.jpg" />
    </div>
    <div class="absolute w-screen transition-all delay-200 home-slide h-128">
      <img class="w-screen h-128" src="/banner2-min.jpg" />
    </div>
    <button
      class="absolute inset-y-0 left-0 slider-button"
      @click="increaseSlider()"
    >
      <div class="p-3 text-3xl text-white bg-black">&#10094;</div>
    </button>
    <button
      class="absolute inset-y-0 right-0 slider-button"
      @click="descreaseSlider()"
    >
      <div class="p-3 text-3xl text-white bg-black">&#10095;</div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const slideIndex = ref(0);

onMounted(() => {
  showSlider(slideIndex.value);
});

const showSlider = (n: any, isReverse: boolean = false) => {
  var slide = document.getElementsByClassName("home-slide");
  console.log(isReverse);
  for (var i = 0; i < slide.length; i++) {
    var width = slide[i].offsetWidth;
    if (isReverse) {
      slide[i].style.left = "auto";
      slide[i].style.right = width * (n + i) + "px";
    } else {
      slide[i].style.left = width * (n + i) + "px";
      slide[i].style.right = "auto";
    }
  }

  // slide[slideIndex.value].style.transform = "translate(0)";

  if (slideIndex.value == slide.length) {
    slideIndex.value = 0;
  }
  if (slideIndex.value - 2 < -slide.length) {
    slideIndex.value = 1;
  }
};

const increaseSlider = () => {
  showSlider((slideIndex.value -= 1), true);
};

const descreaseSlider = () => {
  showSlider((slideIndex.value -= 1));
};
</script>
